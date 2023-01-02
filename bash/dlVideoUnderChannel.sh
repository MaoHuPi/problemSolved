#!/bin/bash
# download videos under channel
read -p 'channel url: ' channelUrl
youtube-dl -f 'bestvideo[height>=720]+bestaudio/best' -ciw -o "%(title)s.%(ext)s" -v --download-archive "downloaded.txt" $channelUrl
