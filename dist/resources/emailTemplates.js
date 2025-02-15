"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerifiedTemplate = exports.passwordChangedConfirmationTemplate = exports.passwordResetTemplate = exports.mailConfirmationTemplate = void 0;
const mailConfirmationTemplate = (url) => {
    return `
  <!DOCTYPE html>
  <html>
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet" />
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          src: local("Lato Regular"), local("Lato-Regular"),
            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 700;
          src: local("Lato Bold"), local("Lato-Bold"),
            url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 400;
          src: local("Lato Italic"), local("Lato-Italic"),
            url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 700;
          src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
            url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff");
        }
      }
  
      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
  
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
  
      img {
        -ms-interpolation-mode: bicubic;
      }
  
      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
  
      table {
        border-collapse: collapse !important;
      }
  
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
  
      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
  
      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }
  
      /* ANDROID CENTER FIX */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    </style>
  </head>
  
  <body style="
            background-color: #f4f4f4;
            margin: 0 !important;
            padding: 0 !important;
          ">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="
              display: none;
              font-size: 1px;
              color: #fefefe;
              line-height: 1px;
              font-family: 'Lato', Helvetica, Arial, sans-serif;
              max-height: 0px;
              max-width: 0px;
              opacity: 0;
              overflow: hidden;
            ">
      We're thrilled to have you here! Get ready to dive into your new account.
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td align="center" valign="top" style="padding: 40px 10px 40px 10px"></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td bgcolor="#ffffff" align="center" valign="top" style="
                        padding: 40px 20px 20px 20px;
                        border-radius: 4px 4px 0px 0px;
                        color: #111111;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 48px;
                        font-weight: 400;
                        letter-spacing: 4px;
                        line-height: 48px;
                      ">
                <h1 style="font-size: 20px; font-weight: 400; margin: 2">
                  <br />
                </h1>
                <a href="https://screenapp.io" target="_blank">
                  <img src="https://s3-us-west-2.amazonaws.com/download.meetrix.io/screenapp/email/210113/screenapp_logo.png" width="33%"
                    height="100%" style="display: block; border: 0px" /></a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td bgcolor="#ffffff" align="left" style="
                        padding: 20px 30px 40px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                <p style="margin: 0">
                  Hi,<br />
                  Thanks for signing up for <strong>Screenapp.io</strong><br />Click the button below to
                  activate your account and
                  complete the signup process.
                </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" style="border-radius: 40px" bgcolor="#e04959"
                            hover="background-color: rgb(196, 51, 51);">
                            <a href="{{API_BASE_URL}}/account/verify/?token={{emailToken}}" target="_blank" style="
                                      font-size: 15px;
                                      font-family: Poppins, sans-serif;
                                      color: #ffffff;
                                      text-decoration: none;
                                      color: #ffffff;
                                      text-decoration: none;
                                      letter-spacing: 2.5px;
                                      padding: 15px 25px;
                                      border-radius: 2px;
                                      border: 1px solid #e04959;
                                      border-radius: 90px;
                                      display: inline-block;
                                      onMouseOver: color='#0F0'" ; "
                                    >VERIFY NOW</a
                                  >
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- COPY -->
                  <tr>
                    <td
                      bgcolor=" #ffffff" align="left" style="
                        padding: 0px 30px 0px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                              <p style="margin: 0">
                                If that doesn't work, copy and paste the following link in
                                your browser:
                              </p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td bgcolor="#ffffff" align="left" style="
                        padding: 20px 30px 20px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <p style="font-size:14px;">
                              <a href="{{API_BASE_URL}}/account/verify/?token={{emailToken}}" target="_blank"
                                style="color: #e04959;">{{API_BASE_URL}}/account/verify/?token={{emailToken}}</a>
                            </p>
                            <hr style="opacity: 0.2" />
                          </td>
                        </tr>
  
                        <tr>
                          <td bgcolor="#ffffff" align="left" style="
                        padding: 0px 30px 20px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <p style="margin: 0">
                              If you have any questions, just contact us.
                              We are always happy to help out.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#ffffff" align="left" style="
                        padding: 0px 30px 40px 30px;
                        {{!-- border-radius: 0px 0px 4px 4px; --}}
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <p style="margin: 0">Cheers,<br />ScreenApp Team</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                        <tr>
                          <td bgcolor="#ffe5e3" align="center" style="
                        padding: 30px 30px 30px 30px;
                        {{!-- border-radius: 4px 4px 4px 4px; --}}
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <h2 style="
                          font-size: 20px;
                          font-weight: 400;
                          color: #111111;
                          margin: 0;
                        ">
                              Need more help?
                            </h2>
                            <p style="margin: 0">
                              Contact our
                              <a href="mailto:support@screenapp.io" target="_blank" style="color: #e04959">support
                                team</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 0px 10px 0px 10px">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                        <tr>
                          <td bgcolor="#f4f4f4" align="left" style="
                        padding: 0px 30px 30px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 18px;
                      ">
                            <br />
                            <center>
                              <p style="margin: 0">
                                Made with ♥ by <a href="https://meetrix.io">Meetrix.io</a>
                                <!-- <a
                        href="#"
                        target="_blank"
                        style="color: #111111; font-weight: 700"
                        >unsubscribe</a
                      >. -->
                              </p>
                            </center>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
  </body>
  
  </html>

`;
};
exports.mailConfirmationTemplate = mailConfirmationTemplate;
const passwordResetTemplate = (url) => {
    return `
  <!DOCTYPE html>
  <html>
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet" />
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          src: local("Lato Regular"), local("Lato-Regular"),
            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 700;
          src: local("Lato Bold"), local("Lato-Bold"),
            url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 400;
          src: local("Lato Italic"), local("Lato-Italic"),
            url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 700;
          src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
            url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff");
        }
      }
  
      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
  
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
  
      img {
        -ms-interpolation-mode: bicubic;
      }
  
      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
  
      table {
        border-collapse: collapse !important;
      }
  
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
  
      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
  
      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }
  
      /* ANDROID CENTER FIX */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    </style>
  </head>
  
  <body style="
            background-color: #DFDFDF;
            margin: 0 !important;
            padding: 0 !important;
            background-repeat: no-repeat;
            background-position: center;
            {{!-- background-image: url('signup_side.png'); --}}
            background-size: cover; ">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato' , Helvetica, Arial,
    sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; ">
      We're thrilled to have you here! Get ready to dive into your new account.
    </div>
    <table border=" 0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td bgcolor="" align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td align="center" valign="top" style="padding: 40px 10px 40px 10px"></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="" align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td bgcolor="#ffffff" align="center" valign="top" style="
                        padding: 40px 20px 20px 20px;
                        border-radius: 4px 4px 0px 0px;
                        color: #111111;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 48px;
                        font-weight: 400;
                        letter-spacing: 4px;
                        line-height: 48px;
                      ">
  
                <a href="https://screenapp.io" target="_blank">
                  <img src="https://s3-us-west-2.amazonaws.com/download.meetrix.io/screenapp/email/210113/screenapp_logo.png" width="33%"
                    height="100%" style="display: block; border: 0px" /></a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="" align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td bgcolor="#ffffff" align="left" style="
                        padding: 20px 30px 40px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                <p style="margin: 0">
                  Hi,<br />
                  We have received a request to change your password.
  
                </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" style="border-radius: 40px" bgcolor="#e04959"
                            hover="background-color: rgb(196, 51, 51);">
                            <a href="{{API_BASE_URL}}/account/resetpassword/?token={{token}}" target="_blank" style="
                                                              font-size: 15px;
                                                              font-family: Poppins, sans-serif;
                                                              color: #ffffff;
                                                              text-decoration: none;
                                                              color: #ffffff;
                                                              text-decoration: none;
                                                              letter-spacing: 2.5px;
                                                              padding: 15px 25px;
                                                              border-radius: 2px;
                                                              border: 1px solid #e04959;
                                                              border-radius: 90px;
                                                              display: inline-block;
                                                              onMouseOver: color='#0F0'" ; "
                                    >RESET PASSWORD</a
                                  >
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- COPY -->
                  <tr>
                    <td
                      bgcolor=" #ffffff" align="left" style="
                        padding: 0px 30px 0px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                              <p style="margin: 0">
                                If that doesn't work, copy and paste the following link in
                                your browser:
                              </p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td bgcolor="#ffffff" align="left" style="
                        padding: 20px 30px 20px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <p style="font-size:14px;">
                              <a href="{{API_BASE_URL}}/account/resetpassword/?token={{token}}" target="_blank"
                                style="color: #e04959">{{API_BASE_URL}}/account/resetpassword/?token={{token}}</a>
                            </p>
                            <hr style="opacity: 0.2" />
                          </td>
                        </tr>
  
                        <tr>
                          <td bgcolor="#ffffff" align="left" style="
                        padding: 0px 30px 20px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <p style="margin: 0">
                              If you think you received this email by mistake, feel free to
                              ignore it.
  
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#ffffff" align="left" style="
                        padding: 0px 30px 40px 30px;
                        {{!-- border-radius: 0px 0px 4px 4px; --}}
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <p style="margin: 0">Cheers,<br />ScreenApp Team</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="" align="center" style="">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                        <tr>
                          <td bgcolor="#ffe5e3" align="center" style="
                        padding: 30px 30px 30px 30px;
                        {{!-- border-radius: 4px 4px 4px 4px; --}}
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 25px;
                      ">
                            <h2 style="
                          font-size: 20px;
                          font-weight: 400;
                          color: #111111;
                          margin: 0;
                        ">
                              Need more help?
                            </h2>
                            <p style="margin: 0">
                              Contact our
                              <a href="mailto:support@screenapp.io" target="_blank" style="color: #e04959">support
                                team</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="" align="center" style="padding: 0px 10px 0px 10px">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                        <tr>
                          <td bgcolor="#f4f4f4" align="left" style="
                        padding: 0px 30px 30px 30px;
                        color: #666666;
                        font-family: 'Lato', Helvetica, Arial, sans-serif;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 18px;
                      ">
                            <br />
                            <center>
                              <p style="margin: 0">
                                Made with ♥ by <a href="https://meetrix.io">Meetrix.io</a>
                                <!-- <a
                          href="#"
                          target="_blank"
                          style="color: #111111; font-weight: 700"
                          >unsubscribe</a
                        >. -->
                              </p>
                            </center>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
  </body>
  
  </html>

`;
};
exports.passwordResetTemplate = passwordResetTemplate;
const passwordChangedConfirmationTemplate = () => {
    return `
  <!DOCTYPE html>
<html>

<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet" />
  <style type="text/css">
    @media screen {
      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        src: local("Lato Regular"), local("Lato-Regular"),
          url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");
      }

      @font-face {
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        src: local("Lato Bold"), local("Lato-Bold"),
          url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff");
      }

      @font-face {
        font-family: "Lato";
        font-style: italic;
        font-weight: 400;
        src: local("Lato Italic"), local("Lato-Italic"),
          url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff");
      }

      @font-face {
        font-family: "Lato";
        font-style: italic;
        font-weight: 700;
        src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
          url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff");
      }
    }

    /* CLIENT-SPECIFIC STYLES */
    body,
    table,
    td,
    a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    /* RESET STYLES */
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    table {
      border-collapse: collapse !important;
    }

    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width: 600px) {
      h1 {
        font-size: 32px !important;
        line-height: 32px !important;
      }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }
  </style>
</head>

<body style="
          background-color: #f4f4f4;
          margin: 0 !important;
          padding: 0 !important;
        ">
  <!-- HIDDEN PREHEADER TEXT -->
  <div style="
            display: none;
            font-size: 1px;
            color: #fefefe;
            line-height: 1px;
            font-family: 'Lato', Helvetica, Arial, sans-serif;
            max-height: 0px;
            max-width: 0px;
            opacity: 0;
            overflow: hidden;
          ">
    We're thrilled to have you here! Get ready to dive into your new account.
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
          <tr>
            <td align="center" valign="top" style="padding: 40px 10px 40px 10px"></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 10px 0px 10px">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
          <tr>
            <td bgcolor="#ffffff" align="center" valign="top" style="
                      padding: 40px 20px 20px 20px;
                      border-radius: 4px 4px 0px 0px;
                      color: #111111;
                      font-family: 'Lato', Helvetica, Arial, sans-serif;
                      font-size: 48px;
                      font-weight: 400;
                      letter-spacing: 4px;
                      line-height: 48px;
                    ">
              
              <a href="https://screenapp.io" target="_blank">
                <img src="https://s3-us-west-2.amazonaws.com/download.meetrix.io/screenapp/email/210113/screenapp_logo.png" width="33%"
                  height="100%" style="display: block; border: 0px" /></a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 10px 0px 10px">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
          <tr>
            <td bgcolor="#ffffff" align="left" style="
                      padding: 20px 30px 40px 30px;
                      color: #666666;
                      font-family: 'Lato', Helvetica, Arial, sans-serif;
                      font-size: 18px;
                      font-weight: 400;
                      line-height: 25px;
                    ">
              <br />
              <p style="margin: 0">
                Hi,<br />
                Your <strong>ScreenApp</strong> password has been successfully
                changed.
              </p>
            </td>
          </tr>

          <tr>
            <td bgcolor="#ffffff" align="left" style="
                      padding: 0px 30px 20px 30px;
                      color: #666666;
                      font-family: 'Lato', Helvetica, Arial, sans-serif;
                      font-size: 18px;
                      font-weight: 400;
                      line-height: 25px;
                    ">
              <p style="margin: 0">
                If this change is unusual, please contact us immediately.
              </p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" align="left" style="
                      padding: 0px 30px 40px 30px;
                      {{!-- border-radius: 0px 0px 4px 4px; --}}
                      color: #666666;
                      font-family: 'Lato', Helvetica, Arial, sans-serif;
                      font-size: 18px;
                      font-weight: 400;
                      line-height: 25px;
                    ">
              <p style="margin: 0">Cheers,<br />ScreenApp Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
          <tr>
            <td bgcolor="#ffe5e3" align="center" style="
                      padding: 30px 30px 30px 30px;
                      {{!-- border-radius: 4px 4px 4px 4px; --}}
                      color: #666666;
                      font-family: 'Lato', Helvetica, Arial, sans-serif;
                      font-size: 18px;
                      font-weight: 400;
                      line-height: 25px;
                    ">
              <h2 style="
                        font-size: 20px;
                        font-weight: 400;
                        color: #111111;
                        margin: 0;
                      ">
                Need more help?
              </h2>
              <p style="margin: 0">
                Contact our
                <a href="mailto:support@screenapp.io" target="_blank" style="color: #e04959">support
                  team</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 10px 0px 10px">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
          <tr>
            <td bgcolor="#f4f4f4" align="left" style="
                      padding: 0px 30px 30px 30px;
                      color: #666666;
                      font-family: 'Lato', Helvetica, Arial, sans-serif;
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 18px;
                    ">
              <br />
              <center>
                <p style="margin: 0">
                  Made with ♥ by
                  <a href="https://meetrix.io">Meetrix.io</a>
                  <!-- <a
                        href="#"
                        target="_blank"
                        style="color: #111111; font-weight: 700"
                        >unsubscribe</a
                      >. -->
                </p>
              </center>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>

    `;
};
exports.passwordChangedConfirmationTemplate = passwordChangedConfirmationTemplate;
const emailVerifiedTemplate = () => {
    return `
  <!DOCTYPE html>
  <html>
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet" />
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          src: local("Lato Regular"), local("Lato-Regular"),
            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: normal;
          font-weight: 700;
          src: local("Lato Bold"), local("Lato-Bold"),
            url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 400;
          src: local("Lato Italic"), local("Lato-Italic"),
            url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff");
        }
  
        @font-face {
          font-family: "Lato";
          font-style: italic;
          font-weight: 700;
          src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
            url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff");
        }
      }
  
      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
  
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
  
      img {
        -ms-interpolation-mode: bicubic;
      }
  
      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
  
      table {
        border-collapse: collapse !important;
      }
  
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
  
      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
  
      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }
  
      /* ANDROID CENTER FIX */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    </style>
  </head>
  
  <body style="
        background-color: #f4f4f4;
        margin: 0 !important;
        padding: 0 !important;
      ">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="
          display: none;
          font-size: 1px;
          color: #fefefe;
          line-height: 1px;
          font-family: 'Lato', Helvetica, Arial, sans-serif;
          max-height: 0px;
          max-width: 0px;
          opacity: 0;
          overflow: hidden;
        ">
      We're thrilled to have you here! Get ready to dive into your new account.
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td align="center" valign="top" style="padding: 40px 10px 40px 10px"></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td bgcolor="#ffffff" align="center" valign="top" style="
                    padding: 40px 20px 20px 20px;
                    border-radius: 4px 4px 0px 0px;
                    color: #111111;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 48px;
                    font-weight: 400;
                    letter-spacing: 4px;
                    line-height: 48px;
                  ">
                <h1 style="font-size: 20px; font-weight: 400; margin: 2">
                  <br />
                </h1>
                <a href="https://screenapp.io" target="_blank">
                  <img src="https://s3-us-west-2.amazonaws.com/download.meetrix.io/screenapp/email/210113/screenapp_logo.png" width="33%"
                    height="100%" style="display: block; border: 0px" /></a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 0px 10px 0px 10px">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
            <tr>
              <td bgcolor="#ffffff" align="left" style="
                    padding: 20px 30px 40px 30px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 25px;
                  ">
                <p style="margin: 0">
                  Hi,<br />
                  We have successfully verified your <strong>screenApp</strong> account.<br>
                  You can now login to your account and enjoy the screenapp features.
  
  
                </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" style="border-radius: 40px" bgcolor="#e04959"
                            hover="background-color: rgb(196, 51, 51);">
                            <a href="{{AUTH_LANDING}}/#/signin" style="
                                                              font-size: 15px;
                                                              font-family: Poppins, sans-serif;
                                                              color: #ffffff;
                                                              text-decoration: none;
                                                              color: #ffffff;
                                                              text-decoration: none;
                                                              letter-spacing: 2.5px;
                                                              padding: 15px 25px;
                                                              border-radius: 2px;
                                                              border: 1px solid #e04959;
                                                              border-radius: 90px;
                                                              display: inline-block;
                                                              onMouseOver: color='#0F0'" ; "
                                >SIGN IN</a
                              >
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- COPY -->
             
              <!-- COPY -->
               
  
             
  
              <tr>
                <td
                  bgcolor=" #ffffff" align="left" style="
                    padding: 0px 30px 20px 30px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 25px;
                  ">
                              <p style="margin: 0">
                                If you have any questions, just contact us.
                                We are always happy to help out.
                              </p>
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#ffffff" align="left" style="
                    padding: 0px 30px 40px 30px;
                    {{!-- border-radius: 0px 0px 4px 4px; --}}
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 25px;
                  ">
                            <p style="margin: 0">Cheers,<br />ScreenApp Team</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                        <tr>
                          <td bgcolor="#ffe5e3" align="center" style="
                    padding: 30px 30px 30px 30px;
                    {{!-- border-radius: 4px 4px 4px 4px; --}}
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 25px;
                  ">
                            <h2 style="
                      font-size: 20px;
                      font-weight: 400;
                      color: #111111;
                      margin: 0;
                    ">
                              Need more help?
                            </h2>
                            <p style="margin: 0">
                              Contact our
                              <a href="mailto:support@screenapp.io" target="_blank" style="color: #e04959">support
                                team</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 0px 10px 0px 10px">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                        <tr>
                          <td bgcolor="#f4f4f4" align="left" style="
                    padding: 0px 30px 30px 30px;
                    color: #666666;
                    font-family: 'Lato', Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 18px;
                  ">
                            <br />
                            <center>
                              <p style="margin: 0">
                                Made with ♥ by <a href="https://meetrix.io">Meetrix.io</a>
                                <!-- <a
                      href="#"
                      target="_blank"
                      style="color: #111111; font-weight: 700"
                      >unsubscribe</a
                    >. -->
                              </p>
                            </center>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
  </body>
  
  </html>
        `;
};
exports.emailVerifiedTemplate = emailVerifiedTemplate;
//# sourceMappingURL=emailTemplates.js.map