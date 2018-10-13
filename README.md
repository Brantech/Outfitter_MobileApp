# Outfittr Mobile App

## About

This repository shall contain all of the source necessary for Outfittr mobile application.

## Usage

1. Install Docker.
2. Set a $HOST_IP environment variable on your machine that contains the IP address of your machine. If this is not possible on your machine, simply skip this step and manually and when running the docker container, simply insert a hardcoded ip address instead of using the `$HOST_IP` variable.
3. Clone this repository.
4. Launch the terminal, and cd into the cloned repository.
5. Execute the following command to build the image:
```
docker build -t outfitter-app .
```
6. Execute the following command the run the container:
```
docker run \
-p 19000:19000 -p 19001:19001 -p 19002:19002 \
-e REACT_NATIVE_PACKAGER_HOSTNAME=$HOST_IP \
--name outfitter-app outfitter-app
```
