# First off, what the hell is this?
I own a HS-DH500GL Buffalo LinkStation, it's a NAS (Network Attatched Storage) which is basically a home file server, mine is about 10+ years old and is still going strong. One of its features is a thing called "I'm Here" which really just plays a short "song" I guess you could call it. heres a video of me triggering the buffalo to play [here](https://cdn.discordapp.com/attachments/456399054969110528/585157587809337433/20190603_094921.mp4). What this program does is it simply triggers the I'm Here feature.

## Why did I make this if it's control panel already does it for you?
I made this because:
> I wanted to learn a bit more of node-fetch.

> I wanted to reverse engineer its control panel.

> (this is something you're gonna see a lot from me) I was bored.

## Are you going to reverse engineer your buffalo anymore?
No.

## Ok, I have the same LinkStation, and I want to use this program, how do I?
Here:
```bash

#Clone the repository to your computer and enter the directory
git clone https://github.com/AlekEagleYT/customimhere.git && cd customimhere

#Install dependencies
npm install

#Run the program
node index <Your devices IP> <Admin username> <Admin password>

#Optionally, you can run the program in debug mode and see the query parameters in the console output
DEBUG=true node index <Your devices IP> <Admin username> <Admin password>

```