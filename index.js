var fs = require('fs');
var _ = require('lodash');
var gravatar = require('gravatar');
var Mustache = require('mustache');
var formatDuration = require('date-fns/formatDuration');
var differenceInMonths = require('date-fns/differenceInMonths');
var startOfMonth = require('date-fns/startOfMonth');
var endOfMonth = require('date-fns/endOfMonth');
var addDays = require('date-fns/addDays');

var d = new Date();
var curyear = d.getFullYear();

function getMonth(startDateStr) {
    switch (startDateStr.substr(5,2)) {
    case '01':
        return "January ";
    case '02':
        return "February ";
    case '03':
        return "March ";
    case '04':
        return "April ";
    case '05':
        return "May ";
    case '06':
        return "June ";
    case '07':
        return "July ";
    case '08':
        return "August ";
    case '09':
        return "September ";
    case '10':
        return "October ";
    case '11':
        return "November ";
    case '12':
        return "December ";
    }
}

function getMimeType(url) {
    global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    return require('check-url-type').get_type(url) ;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function render(resumeObject) {

    resumeObject.basics.capitalName = _.upperCase(resumeObject.basics.name);
    if(resumeObject.basics && resumeObject.basics.email) {
        resumeObject.basics.gravatar = gravatar.url(resumeObject.basics.email, {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    });
    }
    if (resumeObject.basics.image || resumeObject.basics.gravatar) {
        resumeObject.photo = resumeObject.basics.image ? resumeObject.basics.image : resumeObject.basics.gravatar;
        resumeObject.photoType = getMimeType(resumeObject.photo) ;
    }

    _.each(resumeObject.basics.profiles, function(p){
        if(p.iconClass) {
            return;
        }
        switch(p.network.toLowerCase()) {
            // special cases
            case "google-plus":
            case "googleplus":
                p.iconClass = "fab fa-google-plus";
                break;
            case "flickr":
            case "flicker":
                p.iconClass = "fab fa-flickr";
                break;
            case "dribbble":
            case "dribble":
                p.iconClass = "fab fa-dribbble";
                break;
            case "codepen":
                p.iconClass = "fab fa-codepen";
                break;
            case "soundcloud":
                p.iconClass = "fab fa-soundcloud";
                break;
            case "reddit":
                p.iconClass = "fab fa-reddit";
                break;
            case "tumblr":
            case "tumbler":
                p.iconClass = "fab fa-tumblr";
                break;
            case "stack-overflow":
            case "stackoverflow":
                p.iconClass = "fab fa-stack-overflow";
                break;
            case "blog":
            case "rss":
                p.iconClass = "fas fa-rss";
                break;
            case "gitlab":
                p.iconClass = "fab fa-gitlab";
                break;
            case "keybase":
                p.iconClass = "fas fa-key";
                break;
            default:
                // try to automatically select the icon based on the name
                p.iconClass = "fab fa-" + p.network.toLowerCase();
        }

        if (p.url) {
            p.text = p.url;
        } else {
            p.text = p.network + ": " + p.username;
        }
    });

    function handleWorkplace(w) {
        const { startDate, endDate } = w;
        if (startDate) {
            w.startDateYear = (startDate || "").substr(0,4);
            w.startDateMonth = getMonth(startDate || "");
        }
        if(endDate) {
            w.endDateYear = (endDate || "").substr(0,4);
            w.endDateMonth = getMonth(endDate || "");
        } else {
            w.endDateYear = 'Present'
        }
        function handleStringArray(obj, fieldName) {
            if (obj[fieldName]) {
                if (obj[fieldName][0]) {
                    if (obj[fieldName][0] != "") {
                        obj['bool' + capitalizeFirstLetter(fieldName)] = true;
                    }
                }
            }
        }
        handleStringArray(w, 'highlights');
        handleStringArray(w, 'keywords');
        if (startDate) {
          const months = differenceInMonths(
            addDays(endOfMonth(new Date(endDate)), 1),
            startOfMonth(new Date(startDate))
          );
          w.workExperience = formatDuration(
            {
              years: Math.floor(months / 12),
              months: months % 12,
            },
            {
              format: ["years", "months"],
            }
          );
        }
    }

    if (resumeObject.work && resumeObject.work.length) {
        resumeObject.workBool = true;
        _.each(resumeObject.work, handleWorkplace);
    }

    if (resumeObject.volunteer && resumeObject.volunteer.length) {
        resumeObject.volunteerBool = true;
        _.each(resumeObject.volunteer, handleWorkplace);
    }

    if (resumeObject.projects && resumeObject.projects.length) {
        if (resumeObject.projects[0].name) {
            resumeObject.projectsBool = true;
        }
    }

    if (resumeObject.education && resumeObject.education.length) {
        if (resumeObject.education[0].institution) {
            resumeObject.educationBool = true;
            _.each(resumeObject.education, function(e){
                if( !e.area || !e.studyType ){
                  e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
                } else {
                  e.educationDetail = e.area + ", "+ e.studyType;
                }
                if (e.startDate) {
                    e.startDateYear = e.startDate.substr(0,4);
                    e.startDateMonth = getMonth(e.startDate || "");
                } else {
                    e.endDateMonth = "";
                }
                if (e.endDate) {
                    e.endDateYear = e.endDate.substr(0,4);
                    e.endDateMonth = getMonth(e.endDate || "")

                    if (e.endDateYear > curyear) {
                        e.endDateYear += " (expected)";
                    }
                } else {
                    e.endDateYear = 'Present'
                    e.endDateMonth = '';
                }
                if (e.courses) {
                    if (e.courses[0]) {
                        if (e.courses[0] != "") {
                            e.educationCourses = true;
                        }
                    }
                }
            });
        }
    }

    if (resumeObject.awards && resumeObject.awards.length) {
        if (resumeObject.awards[0].title) {
            resumeObject.awardsBool = true;
            _.each(resumeObject.awards, function(a){
                a.year = (a.date || "").substr(0,4);
                a.day = (a.date || "").substr(8,2);
                a.month = getMonth(a.date || "");
            });
        }
    }

    if (resumeObject.publications && resumeObject.publications.length) {
        if (resumeObject.publications[0].name) {
            resumeObject.publicationsBool = true;
            _.each(resumeObject.publications, function(a){
                a.year = (a.releaseDate || "").substr(0,4);
                a.day = (a.releaseDate || "").substr(8,2);
                a.month = getMonth(a.releaseDate || "");
            });
        }
    }

    if (resumeObject.skills && resumeObject.skills.length) {
        if (resumeObject.skills[0].name) {
            resumeObject.skillsBool = true;
        }
    }

    if (resumeObject.interests && resumeObject.interests.length) {
        if (resumeObject.interests[0].name) {
            resumeObject.interestsBool = true;
        }
    }

    if (resumeObject.languages && resumeObject.languages.length) {
        if (resumeObject.languages[0].language) {
            resumeObject.languagesBool = true;
        }
    }

    if (resumeObject.references && resumeObject.references.length) {
        if (resumeObject.references[0].name) {
            resumeObject.referencesBool = true;
        }
    }

    resumeObject.css = fs.readFileSync(__dirname + "/style.css", "utf-8");
    resumeObject.printcss = fs.readFileSync(__dirname + "/print.css", "utf-8");
    var theme = fs.readFileSync(__dirname + '/resume.template.html', 'utf8');
    var resumeHTML = Mustache.render(theme, resumeObject);


    return resumeHTML;
};
module.exports = {
    render: render
}
