require('dotenv').config();
const express = require('express')
const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 20; // Increase this as needed
const app = express()
const cors = require('cors')
const pool = require('../db')
const { google } = require('googleapis')
app.use(cors())
app.use(express.json())

const CREDENTIALS = "YOUR OWN CREDENTIALS"
const CALENDAR_ID = "YOUR_OWN_ID"

const SCOPES = 'https://www.googleapis.com/auth/calendar';

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);
const calendar = google.calendar({ version: "v3", auth });

const parseToIso = (schedule, type) => {
    const parts = schedule.split(' ');
    const days = parts.slice(0, parts.length - 1).join(' ');
    const time = parts[parts.length - 1]; // Last part
    const [startTime, endTime] = time.split('-');
    const currentDate = new Date();
    const daysMapping = {
        MON: 1,
        TUE: 2,
        WED: 3,
        THU: 4,
        FRI: 5,
        SAT: 6,
        SUN: 0
    };

    // Get the next occurrences of the day
    const daysArray = days.split(' ');
    const nextDates = [];

    daysArray.forEach(day => {
        const dayIndex = daysMapping[day];
        let daysUntilNext = (dayIndex - currentDate.getDay() + 7) % 7;

        // If today is the same day but time has passed, look for the next week
        if (daysUntilNext === 0 && currentDate.getHours() > parseInt(startTime.split(':')[0])) {
            daysUntilNext += 7; // Move to the next week for the same day
        }

        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + daysUntilNext);
        nextDates.push(nextDate);
    });

    // Sort dates to find the two earliest
    nextDates.sort((a, b) => a - b);

    // Ensure you only take the first two dates
    const targetDates = nextDates.slice(0, 2);

    // Set the appropriate hours and return the dates
    const result = targetDates.map((date, index) => {
        const [startHour, startMinute] = startTime.split(':');
        const [endHour, endMinute] = endTime.split(':');

        // Set the hours based on whether we're looking for start or end time
        if (type === 'start') {
            date.setHours(startHour, startMinute, 0, 0);
        } else if (type === 'end') {
            date.setHours(endHour, endMinute, 0, 0);
        }
        // Validate the date before converting to ISO
        if (isNaN(date.getTime())) {
            throw new Error('Invalid Date');
        }
        return date.toISOString();
    });

    return result; // Return an array of two ISO strings
};

app.post('/calendarAdd', async (req, res) => {
    try {
        const { course_name, schedule } = req.body
        const startTimes = parseToIso(schedule, 'start'); // Array of start times for each day
        const endTimes = parseToIso(schedule, 'end'); // Array of end times for each day

        const events = [];

        for (let i = 0; i < startTimes.length; i++) {
            const event = {
                summary: `${course_name} `,
                description: `Course: ${course_name}`,
                start: {
                    dateTime: startTimes[i],
                    timeZone: 'Asia/Kolkata', // Adjust to your time zone
                },
                end: {
                    dateTime: endTimes[i],
                    timeZone: 'Asia/Kolkata', // Adjust to your time zone
                },
            };

            // Insert event into Google Calendar
            const response = await new Promise((resolve, reject) => {
                calendar.events.insert({
                    calendarId: CALENDAR_ID,
                    resource: event,
                }, (err, res) => {
                    if (err) {
                        return reject(err); // Reject the promise on error
                    }
                    resolve(res); // Resolve with the response
                });
            });

            events.push(response.data.id); // Collect event IDs
        }

        res.status(200).json({ message: 'Events added to Google Calendar successfully!', eventIds: events });
    } catch (error) {
        console.error('Error adding to Google Calendar:', error);
        return res.status(500).json({ message: "Error adding to Google Calendar" });
    }
});

module.exports = app