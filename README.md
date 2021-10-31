<h1 style="text-align:center">Cintor</h1>
<div style="text-align:center">
    <p>Vote Manager, Moderation for a peaceful cinema server.</p>
    <p align="center">
        <a href="#overview">Overview</a>
        •
        <a href="#installation">Installation</a>
        •
        <a href="#commands">Commands</a>
        •
        <a href="#license">License</a>
    </p>
</div>

## Overview
This is a tool bot for cinema discord servers.
Create votes to choose together the film, a bit of moderation and manage the film show.

## Installation
### Create a bot
First, you need to create a bot on [Discord Developer Portal](https://discord.com/developers/applications).

### Clone repository
To install the bot, you need first to clone this repository:
```sh
$ git clone https://github.com/UnEpicier/Cintor.git
```

### Config File
Then, enter in the folder and create a file named `.env`, edit it and add:
```env
TOKEN=<YourDiscordBotToken>
GUILD_ID=<YouGuildID>
```
The Bot Token can be found on the [Discord Developer Portal](https://discord.com/developers/applications)
and the Guild ID can be found by right-clicking on the head of your server, (where you can access server settings, etc...)

### Launching
Before launching, you will need to install [NodeJS](https://nodejs.org/en/download/)
Now you can launch it!
Open a terminal in the folder and type:
```sh
$ node index.js
```

## Commands
- Votes
    - `/createvote`
Create a blank vote with an ID
    - `/deletevote <voteID>`
Delete a vote with his ID
    - `/addchoice <voteID> <emoji> <title>`
Add a choice by giving the vote ID, the emoji to react with and the text that will be displayed
    - `/deletechoice <voteID> <emoji>`
Delete a choice by giving the vote ID and the emoji to fetch the choice
    - `/startvote <voteID> <maxTime>`
Display and start the vote by giving the vote ID and the maximum time to participate to the vote in minutes

- Moderation
    - `/mute <usertag>`
Mute the given user
    - `/unmute <usertag>`
Unmute the given user
    - `/muteall`
Mute all users in the voice channel where the sender of the command is, except him
    - `/unmuteall`
Unmute all users in the voice channel where the sender of the command is, except him

## License
[GNU General Public License v3.0](https://github.com/UnEpicier/Cintor/blob/main/LICENSE)