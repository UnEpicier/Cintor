<h1 style="text-align:center">Cintor</h1>
<div style="text-align:center">
    <p>Vote Manager, Moderation for a peaceful cinema server.</p>
    <p align="center">
        <a href="#overview">Overview</a>
        •
        <a href="#installation">Installation</a>
        •
        <a href="#commands">Commandes</a>
        •
        <a href="#license">License</a>
    </p>
</div>

## Overview
This is a tool bot for cinema discord servers.
Create votes to choose together the film, a bit of moderation and manage the film show.

## Installation
Coming soon...

## Commands
- Votes
    - `/createvote`
Create a blank vote with an ID
    - `/deletevote <voteID>`
Delete a vote with his ID
    - `/addchoice <voteID> <emoji> <text>`
Add a choice by giving the vote ID, the emoji to react with and the text that will be displayed
    - `/deletechoice <voteID> <emoji>`
Delete a choice by giving the vote ID and the emoji to fetch the choice
    - `/startvote <voteID> <maxTime>`
Display and start the vote by giving the vote ID and the maximum time to participate to the vote in minutes

- Film
The 2 first commands need to be called by the user that stream the film.
    - `/fstart`
Start the show by auto-muting everyone except the user that stream the film.
    - `/fstop`
Stop the show by auto-unmuting everyone
    - `/frequest`
Request a pause during the show, to talk or anything else. It send a DM to the streamer to pause the film.
- Moderation
    - `/mute <usertag>`
Mute the given user
    - `/unmute <usertag>`
Unmute the given user
    - `/muteall`
Mute all users in the voice channel where the sender of the command is, except him
    - `/unmuteall`
Unmute all users in the voice channel where the sender of the command is, except him
