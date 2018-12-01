# HealthItForward

## Project Prerequisites and Necessary Libraries
### NPM - Node Package Manager
   1. Navigate to [NodeJS](https://nodejs.org/en/)
   2. Use the download links provided to get the latest version of NodeJS for your operating system
   3. Once downloaded, run and the installation wizard to install NodeJS
      * Important: Allow the installer to create new PATH variables
   4. NodeJS should now be installed!

### Angular (latest version)
   1. If not already installed, install NodeJS, version 8.x or greater
   2. Open Terminal or Command Prompt and run the following command: `npm install -g @angular/cli`
   3. Angular should now be installed!

## Download the Project
### Using Git
   1. Navigate to [the project GitHub repository](https://github.com/adunford3/HealthItForward.github.io)
   2. Clone the project by copying the link provided in the green “Clone or Download” dropdown and running the following console                command in the directory of your choosing: <br /> `git clone https://github.com/adunford3/HealthItForward.github.io.git`

### Without Git
   1. Navigate to [the project GitHub repository](https://github.com/adunford3/HealthItForward.github.io)
   2. Download the project by opening the green “Clone or Download” dropdown and clicking “Download ZIP”
   3. Save the zip file in the location of your choosing
   4. Unzip the file

## Running the Project
### In the Command Prompt
   1. Navigate to the folder where the project files were cloned or downloaded
   2. Navigate to the internal folder “healthitforward”, eg: <br /> `C:\Users\{yourUsername}\Documents\HealthItForward.github.io\healthitforward`
   3. Once in the healthitforward folder, run the following console command: `npm install`
   4. After the installation finished, run the project with the following command: `ng serve`
   5. Once the command finished running, the project can be seen by navigating to `http://localhost:4200/` in your browser

## HealthItForward v1.0 Release Notes
### New Software Features in v1.0
   1.Registration
      1. Register with email and password
      2. Fill out an introductory health survey for personal profile information
   2. Login
      1. Login with persistent email and password from registration phase
   3. Groups
      1. Create new groups
      2. Sort by popular, alphabetical, old-to-new groups
      3. Subscribe to a group
      4. Unsubscribe from a group
   4. Threads
      1. Create new threads
      2. Up-vote threads
      3. Can post embedded Youtube videos and text to thread body
   5. Surveys
      1. Create new surveys
      2. View click count of surveys
      3. Click on survey to be navigated to third-party page to complete the survey
   6. Profile
      1. Has information on username and health survey, in order to tack a user’s health

### Bug Fixes
   1. Resolved Object Not Found error caused by dummy thread data
   2. Fixed thread titles not appearing correctly from database
   3. New threads now assigned to proper group correctly in database
   4. Fixed error where users could not subscribe to a particular group

### Known Bugs and Defects
#### Bugs
   1. Resizing window causes the UI to become distorted
   2. Side-navigation-bar does not contain user’s groups

#### Missing Functionality
   1. Ability to register as a patient, caregiver, or researcher
   2. Ability to reply to threads
   3. Ability to search for groups, threads, or surveys
   4. Ability to subscribe/unsubscribe from threads
   5. Sorting threads

### Upcoming Features in v1.1
   1. Ability to create a blog posts so that users can interact and share personal stories
   2. Ability to donate money towards the future work of the website
   3. Ability to translate the contents of a page to a different language
   4. Ability to verify a user’s credentials during registration
