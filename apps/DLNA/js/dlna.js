/*
 * Copyright (c) 2013, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */
var stopConnectionSearch = undefined;
var remoteMediaPreviouslyLoaded = false;

function convertMediaServerContent(item)
{
	console.log(">>> MediaObject2 >>> " + JSON.stringify(item));
	var content = { id: item.Path, title: item.DisplayName };

	if (item.Type.indexOf("container") == 0)
	{
		content.directoryURI = "";
		content.storageType = "EXTERNAL";
	}

	else
	{
		content.editableAttributes = [];
		content.name = content.title;
		content.contentURI = item.URLs[0];
		content.mimeType = item.MIMEType;
		content.size = item.Size;
		content.rating = 0;
		content.remoteFile = true;

		if (item.Type.indexOf("video") == 0)
		{
			content.type = "VIDEO";
			content.artists = new Array();
			content.artists[0] = "Unknown";
			content.duration = item.Duration;
			content.width = item.Width;
			content.height = item.Height;
		}

		else if (item.Type.indexOf("audio") == 0 ||
		item.Type.indexOf("music") == 0)
		{
			content.type = "AUDIO";
			content.album = item.Album ? item.Album : "Unknown";
//			content.coverArt = musicIcon;
			content.artists = new Array();
			content.artists[0] = item.Artist ? item.Artist : "Unknown";
			content.bitrate = item.SampleRate;
			content.duration = item.Duration;
		}

		if (item.Type.indexOf("image") == 0)
		{
			content.type = "IMAGE";
			content.width = item.Width;
			content.height = item.Height;
			content.orientation = "NORMAL";
		}
	}

	return content;
}

function browseCallback(medias)
{
	console.log("MediaPlayer: MediaServer has called browseCallback");
	console.log("found " + medias.length + " medias.");

	for (var i=0; i<medias.length; i++)
		convertMediaServerContent(medias[i]);
}

function findAllCallback(medias)
{
	console.log("MediaServer findAllCallback");
	console.log("found " + medias.length + " medias.");

	clearInterval(stopConnectionSearch);
	stopConnectionSearch = undefined;

	var itemsAdded = 0;
	var audioContent = new Array();
	var videoContent = new Array();
	var imageContent = new Array();

	for (var i=0; i < medias.length; i++)
	{
		var current = convertMediaServerContent(medias[i]);

		if (current)
		{
			switch(current.type)
			{
				case "AUDIO":
					audioContent.push(current);
					itemsAdded += 1;
					break;
				case "VIDEO":
					videoContent.push(current);
					itemsAdded += 1;
					break;
				case "IMAGE":
					imageContent.push(current);
					itemsAdded += 1;
					break;
				default:
			}
		}
	}

	//Force MediaPlayer to reload the lists so the new items show


	audioPlayer.updateContent(audioContent, true);
	videoPlayer.updateContent(videoContent, true);
    UpdateImages(imageContent);
    $("#ScreenConnect").css("display","none");
    $("#ScreenHome").css("display","block");
}

function foundMediaServer(srv)
{
	console.log("MediaPlayer: New MediaServer Found");
	console.log("MediaServer id: " + srv.id);
	console.log("MediaServer friendlyName: " + srv.friendlyName);

	clearInterval(stopServerSearch);

	if (srv.root)
	{
		console.log("MediaPlayer: MediaServer root folder: " + srv.root.id);
		srv.browse(srv.root.id, "+DisplayName", 0, 0, browseCallback);
		srv.find(srv.root.id, "*", "+DisplayName", 0, 0, findAllCallback);

	// Removing this for now to keep from spamming.  Note Rygel must be running when launched or it will never find it
	//	if (stopConnectionSearch !== undefined)
	//		clearInterval(stopConnectionSearch);

	//	stopConnectionSearch = setInterval(function(){console.log("MediaPlayer searching for remote media..."); tizen.mediaserver.scanNetwork(foundMediaServer);}, 3000);

	}
	else
		console.log("MediaServer not browsable");
}
