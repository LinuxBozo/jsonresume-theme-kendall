#jsonresume-theme-bootstrap-icons

A fork of the [uber-classy](https://github.com/JaredCubilla/jsonresume-theme-classy) theme for JSONResume, to rework it into Bootstrap and add some personal flair, particularly around patent-type publications.

## Usage

To first get started with this JSONResume theme, you'll need to have the JSONResume CLI installed. If you haven't already install it with `npm install -g resume-cli`. If this doesn't work, try `sudo npm install -g resume-cli`.

After this, you can get your resume.json ready by typing `resume init`. After hitting enter, your resume will be initialized and you can edit it and fill in the neccessary fields. Check out [the official resume-schema repository](https://github.com/jsonresume/resume-schema) for more information on filling these fields.

When you are finished with your resume, you may test it by yet again opening the command line and typing `resume serve --theme bootstrap-icons` to see how it looks with this theme. You can replace the word `bootstrap-icons` with other theme names too.
### Install the command line

We're going to use the official [resume-cli](https://github.com/jsonresume/resume-cli) to run our development server.

Go ahead and install it:

```
sudo npm install -g resume-cli
```

### Install npm packages

We need to install the dependencies. `cd` into the theme folder we just downloaded and run:

```bash
sudo npm install
```

This will read the local `package.json` and install the packages listed under `dependencies`.

### Serve theme

While inside the theme folder, simply run:

```
resume serve
```

You should now see this message:

```
Preview: http://localhost:4000
Press ctrl-c to stop
```

Congratulations, you've made it!

__The theme development can now begin.__

## Tips

The publications section understands patents a little better now. Added to the official specification are:

Parameter       | Required? | Type   | Description
----------------|-----------|--------|--------------
 `patentNumber` | optional  | string | Patent number, to be formatted
 `patentStatus` | optional  | string | Issued or Pending

```json
 "publications": [
    {
      "name": "Secure communication system for mobile devices",
      "patentNumber": "US 8,392,699",
      "summary": "A system for improving PKI performance and reliability by re-imagining the standard protocols into a disadvantaged and unreliable network architecture. This is a core technology of SAIFE®.",
      "status": "Issued",
      "releaseDate": "2013-03-05",
      "website": "http://www.google.com/patents/US8392699"
    }
 ]
```

As of now, the "Classy" theme supports the following profiles in the bio.profiles array.

* Facebook
* Twitter
* Google Plus
* Linkedin
* YouTube
* Behance
* CodePen
* Vimeo
* Flickr
* Github
* Pinterest

Every single one of these is optional, and every field in the bio.profiles array **must** be entered lowercase, without spaces. If you want support for more social networks, feel free to leave an issue. Thanks.

If you want to keep your resume mobile-friendly, please limit the number of profiles to 10, please. No one should have over 10 profiles on their resume anyway.

Every section is optional also. If per se, you do not include the publications array in your resume.json, no publications section will appear.

If you find any other problems with this theme in specified, do feel free to leave an issue. Thanks.

## Colophon

Thanks to [Jared Cubilla](https://github.com/JaredCubilla) for the basis of this theme.

Thanks to the wonderful [Font Awesome](https://fontawesome.io) for their free-to-use icon font, and a big thank you to the JSONResume theme for their wonderful idea and helping me with a few issues on my part.
