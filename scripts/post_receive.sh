#!/bin/bash
echo "Hi Alex"

# Clone the repo in the temp dir
cd /home/v3rt1go/www/temp
echo "Cloning git repo in temp directory"
git clone /home/v3rt1go/www/repos/boilerplate boilerplate

# Install project dependencies on the cloned dir
cd /home/v3rt1go/www/temp/boilerplate
echo "Setting node version"
# If we have nvm we should set the required node version here
echo "Installing npm dependencies"
npm install
echo "Installing bower dependencies"
bower install

# Turn off pm2 for this project
echo "Turning off the application"
pm2 stop boilerplate

# Move the temp bits & built stuff to our project in /apps and delete old files
echo "Deleting the old application"
rm -R /home/v3rt1go/www/apps/boilerplate
echo "Moving the new application"
mv /home/v3rt1go/www/temp/boilerplate /home/v3rt1go/www

# Turn pm2 back on for this site
echo "Starting the application"
pm2 start /home/v3rt1go/www/app/boilerplate/index.js --name "boilerplate"
