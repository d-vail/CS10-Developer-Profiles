import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './DevProfile.css';

/**
 *
 */
export default ({ getGS }) => {
  const userInfo = getGS('userInfo');

  const TS = getGS('userInfo').topSkills;
  const AS = getGS('userInfo').additionalSkills;
  const SS = getGS('userInfo').skills;
  const allSkills = TS.concat(AS, SS);
  const skillList = allSkills.map(skill => (
    <li>
      {skill}
      {` `}
    </li>
  ));

  console.log({ TEST_GETGS: getGS('userInfo') });
  console.log({ TEST_GETGS: getGS('userInfo').email });
  console.log({ ...userInfo });
  /**
   * PENDING FIELDS: `familiarWith`
   */
  return (
    <div>
      <div className="container">
        <Paper>
          <div className="topCard">
            <div className="topCardLeft">
              <div className="nameCard">
                <div className="photo">
                  <img className="pic" src={require('./img/picard.jpg')} title="Profile Photo" alt="Photo" />
                </div>
                <div className="basicInfo">
                  <div className="name">
                    <Typography variant="headline" component="h3">
                      {userInfo.firstName} {userInfo.lastName}
                    </Typography>
                  </div>
                  <div className="currentLocation">
                    <Typography variant="headline" component="h3">
                      {userInfo.currentLocation}
                    </Typography>
                  </div>
                  <div className="summary">
                    <Typography>{userInfo.summary}</Typography>
                  </div>
                  <div className="desiredTitle">Desired Title: {userInfo.desiredTitle}</div>
                  <div className="tagCloud">
                    <ul>{skillList}</ul>
                  </div>
                </div>
              </div>
              <div className="nameCardDown" />
            </div>

            <div className="topCardRight">
              <a href={userInfo.acclaimBadge}>
                <img
                  src={require('./img/lambdaColor.png')}
                  width="50"
                  height="50"
                  title="Acclaimed Badge"
                  alt="Badge"
                />
              </a>
              <a href={userInfo.socialNetwork}>
                <img src={require('./img/sns.png')} width="50" height="50" title="SNS" alt="SNS" />
              </a>
              <a href={userInfo.github}>
                <img src={require('./img/GitHub.png')} width="50" height="50" title="Github" alt="Github Repo" />
              </a>
              <a href={userInfo.linkedin}>
                <img src={require('./img/linkedin.jpg')} width="50" height="50" title="Linkedin" alt="Linkedin" />
              </a>
              <a href={userInfo.portfolio}>
                <img src={require('./img/portfolio.png')} width="50" height="50" title="Portfolio" alt="Portfolio" />
              </a>
            </div>
          </div>

          <div className="downCard">
            <div className="projects">
              <div>Projects: </div>
              {/* {userInfo.projects} */}
            </div>
            <div className="experience">
              <div>Experience: </div>
              {/* {userInfo.experience} */}
            </div>
            <div className="education">
              <div>Education: </div>
              {/* {userInfo.education} */}
            </div>
            <div className="placesInterested">
              <div>Locations Interested: </div>
              {/* {userInfo.placesInterested} */}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};
