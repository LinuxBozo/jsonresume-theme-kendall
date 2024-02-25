# jsonresume-theme-kendall-bushmanov

A theme for the [JSONResume](https://github.com/jsonresume/resume-schema) schema, that relies on Bootstrap and FontAwesome, added with some personal flair.

**NOTE**: This supports schema 1.0.0. Some things may be missing or broken if your resume.json is using the older schema.

## Usage

To first get started with this JSONResume theme, you'll need to have the JSONResume CLI installed. If you haven't already install it with `npm install -g resume-cli`. If this doesn't work, try `npm install -g resume-cli`.

After this, you can get your resume.json ready by typing `resume init`. After hitting enter, your resume will be initialized and you can edit it and fill in the neccessary fields. Check out [the official resume-schema repository](https://github.com/jsonresume/resume-schema) for more information on filling these fields.

When you are finished with your resume, you may test it by yet again opening the command line and typing `resume serve --theme kendall-bushmanov` to see how it looks with this theme. You can replace the word `kendall-bushmanov` with other theme names too.

### Install the command line

We're going to use the official [resume-cli](https://github.com/jsonresume/resume-cli) to run our development server.

Go ahead and install it:

```
sudo npm install -g resume-cli
```

### Install npm packages

We need to install the dependencies. `cd` into the theme folder we just downloaded and run:

```bash
npm install
```

This will read the local `package.json` and install the packages listed under `dependencies`.

### Serve theme

While inside the theme folder, simply run:

```
resume serve --theme .
```

You should now see this message:

```
Preview: http://localhost:4000
Press ctrl-c to stop
```

Congratulations, you've made it!

__The theme development can now begin.__

## Tips

As of now, the theme supports the following profiles in the basics.profiles array.

* Facebook
* Github
* Twitter
* Google Plus
* YouTube
* Vimeo
* Linkedin
* Pinterest
* Flickr
* Behance
* Dribbble
* CodePen
* Soundcloud
* Steam
* Reddit
* Tumblr
* Stack Overflow
* Bitbucket
* Gitlab

Every single one of these is optional, and every field in the basics.profiles array **must** be entered without spaces. This theme will try to use the matching `-square` version of the icon from FontAwesome if it doesn't already have support for one of your profiles. If you want support for more social networks, feel free to leave an issue, or even better, submit a pull request. Thanks.

If you want to keep your resume mobile-friendly, please limit the number of profiles to 10, please. No one should have over 10 profiles on their resume anyway.

Every section is optional. If you do not include the publications array in your resume.json, no publications section will appear.

If you find any other problems with this theme in specified, do feel free to leave an issue. Thanks.
