# Google Sheet Leaderboard

This project provides a dynamic leaderboard that tracks user performance across various competitive programming platforms, including **LeetCode**, **CodeChef**, and **Codeforces**. The leaderboard is managed within a Google Sheet and includes comprehensive details such as:

- **Handle**: The username of the participant on the platform.
- **No of Contests Given**: The total number of contests the user has participated in across platforms.
- **Recent Contest Given**: The most recent contest the user participated in.
- **Latest Contest**: The name of the latest contest.
- **Latest Contest Ranking**: The ranking achieved in the latest contest.
- **Previous Rating**: The user's rating before the latest contest.
- **Latest Rating**: The user's current rating after the latest contest.
- **Rating Change**: The difference between the previous and latest ratings.

## Features

- **Multi-Platform Support**: Track contest performance from **LeetCode**, **CodeChef**, and **Codeforces**.
- **Automatic Updates**: The leaderboard updates automatically using Google Apps Script, running on Google's servers.
- **Trigger-Based Updates**: Set up triggers to update the leaderboard frequently, ensuring it always displays the most recent data.
- **Google Sheets Integration**: Fully integrated with Google Sheets, making the leaderboard easily accessible and shareable.

## How It Works

This project uses Google Apps Script to fetch contest data from the APIs of LeetCode, CodeChef, and Codeforces. The script runs on Google's servers and interacts with the Google Sheets API to update the leaderboard in real-time.

### Leaderboard Columns

1. **Handle**: The participant's username on the respective platform.
2. **No of Contests Given**: The total number of contests the participant has completed on all platforms.
3. **Recent Contest Given**: The most recent contest the participant participated in on any platform.
4. **Latest Contest**: The title or name of the latest contest.
5. **Latest Contest Ranking**: The ranking position in the latest contest.
6. **Previous Rating**: The participant's rating before the most recent contest.
7. **Latest Rating**: The new rating after the recent contest.
8. **Rating Change**: The difference between the previous and latest ratings.

## Platforms Supported

- **LeetCode**: Fetch contest performance and rankings from LeetCode.
- **CodeChef**: Retrieve user contest data and rankings from CodeChef.
- **Codeforces**: Access user contest history and ratings from Codeforces.

## Getting Started

To use this project, follow these steps:

### Prerequisites

- A Google account.
- Access to Google Sheets.
- Basic knowledge of Google Apps Script.

### Setup Instructions

1. **Create a Google Sheet**:
   - Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
   - Structure your sheet with the following columns: `Handle`, `No Of Contests Given`, `Recent Contest Given`, `Latest Contest`, `Latest Contest Ranking`, `Previous Rating`, `Latest Rating`, `Rating Change`.

2. **Open Google Apps Script**:
   - Click on `Extensions` in your Google Sheet.
   - Select `Apps Script` to open the script editor.

3. **Copy and Paste the Code**:
   - Copy the provided Google Apps Script code from this repository.
   - Paste it into the script editor.
   - Ensure the script includes the necessary functions to interact with the APIs of LeetCode, CodeChef, and Codeforces.

4. **Set Up Triggers**:
   - To keep your leaderboard updated automatically, set up time-driven triggers:
     1. In the Apps Script editor, go to `Triggers` (the clock icon on the left).
     2. Click on `Add Trigger`.
     3. Choose the function that updates the leaderboard and set up a time-based trigger (e.g., every hour or daily).

5. **Save and Deploy**:
   - Save your script and authorize it to run.
   - The script will automatically fetch data and update the Google Sheet with the latest contest information.


## Usage

- **View the Leaderboard**: Open the Google Sheet to view the updated leaderboard with the latest rankings and ratings across all supported platforms.
- **Automated Updates**: The script will automatically pull and update the data based on the frequency specified by your triggers.

## Customization

Feel free to customize the script to support additional competitive programming platforms, add more features like advanced statistics, or change the frequency of updates.

## Contributing

If you’d like to contribute to this project, you’re welcome to fork the repository, create a new branch, and submit a pull request. Contributions to improve functionality or add new features are greatly appreciated!

