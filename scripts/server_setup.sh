# This script handles setting up the server structure and requirements
# to have git deploys working

# Create a web root
mkdir ~/www

# Create a dir for holding the apps
mkdir ~/www/apps

# Create a dir for git repo receives
mkdir ~/www/repos

# Create a temp dir for holding live pushes
mkdir ~/www/temp

# Create shared directories for images and data
mkdir -p ~/www/shared/boilerplate/images
mkdir -p ~/www/shared/boilerplate/data

# Create a bare git repo for this apps
# A bare repo means it will use that folder for the git repo instead of the usual
# .git folder. Usually when we say git init it will create the .git folder and put
# the contents of this folder there. With a bare repo we are basicly saying we're
# going to use this folder as the git repo.
mkdir ~/www/repos/boilerplate && git init ~/www/repos/boilerplate --bare

# Check out the hooks directory - the symlinks
# Create with vim post-recieve the script and add #!/bin/bash at the first line and echo "Hi Alex" on the second line
# Give x permissions to the file with chmod +x post-recieve
# From the project folder (~/Projects/boilerplate) add a git remote to /www/repos/boilerplate
# git remote add deploy /home/v3rt1go/www/repos/boilerplate
# add and commit the changes
# git push deploy master ---- we should see remote: Hi Alex in the output
