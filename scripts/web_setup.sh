#!/bin/bash

# First we have to transfer the file in our users home path
# scp -P 15121 ~/Projects/boilerplate/scripts/boilerplate.webwire.ro agriciuc@web1.webwire.ro:~/configs/

# Copy nginx config file from app server
echo "Copying nginx website config file"
sudo cp $HOME/configs/boilerplate.webwire.ro /etc/nginx/sites-available/

# Create simlink to /sites-enabled
echo "Enabling website"
sudo ln -s /etc/nginx/sites-available/boilerplate.webwire.ro /etc/nginx/sites-enables/boilerplate.webwire.ro

# Restart nginx
echo "Restarting nginx"
sudo service nginx restart

echo "All done! Please check you site."
