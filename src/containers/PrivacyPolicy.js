import React from 'react';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

const PrivacyPolicy = props => {
  return (
    <Content>
      <FONTS.H1>Meetsta Privacy Policy</FONTS.H1>
      <FONTS.P>
        This Privacy Policy describes how your personal information is collected, used, and shared
        when you visit or make a purchase from www.meetsta.com (the “Site”).
      </FONTS.P>
      <Content.Seperator />

      <FONTS.H2>PERSONAL INFORMATION WE COLLECT</FONTS.H2>
      <FONTS.P>
        When you visit the Site, we automatically collect certain information about your device,
        including information about your web browser, IP address, time zone, and some of the cookies
        that are installed on your device. Additionally, as you browse the Site, we collect
        information about the individual web pages or products that you view, what websites or
        search terms referred you to the Site, and information about how you interact with the Site.
        We refer to this automatically-collected information as “Device Information.” We collect
        Device Information using the following technologies:
        <br />
        <br />- “Cookies” are data files that are placed on your device or computer and often
        include an anonymous unique identifier. For more information about cookies, and how to
        disable cookies, visit http://www.allaboutcookies.org. - “Log files” track actions occurring
        on the Site, and collect data including your IP address, browser type, Internet service
        provider, referring/exit pages, and date/time stamps. - “Web beacons,” “tags,” and “pixels”
        are electronic files used to record information about how you browse the Site.
        <br />
        <br />
        Additionally when you make a purchase or attempt to make a purchase through the Site, we
        collect certain information from you, including your name, billing address, shipping
        address, payment information and email address. We refer to this information as “Order
        Information.”
        <br />
        <br />
        When we talk about “Personal Information” in this Privacy Policy, we are talking both about
        Device Information and Order Information.
      </FONTS.P>

      <FONTS.H2>HOW DO WE USE YOUR PERSONAL INFORMATION?</FONTS.H2>
      <FONTS.P>
        We use the Order Information that we collect generally to fulfill any orders placed through
        the Site (including processing your payment information, arranging for shipping, and
        providing you with invoices and/or order confirmations). Additionally, we use this Order
        Information to: Communicate with you; Screen our orders for potential risk or fraud; and
        When in line with the preferences you have shared with us, provide you with information or
        advertising relating to our products or services. We use the Device Information that we
        collect to help us screen for potential risk and fraud (in particular, your IP address), and
        more generally to improve and optimize our Site (for example, by generating analytics about
        how our customers browse and interact with the Site, and to assess the success of our
        marketing and advertising campaigns).
      </FONTS.P>

      <FONTS.H2>SHARING YOUR PERSONAL INFORMATION</FONTS.H2>
      <FONTS.P>
        We share your Personal Information with third parties to help us use your Personal
        Information, as described above. For example, we use Shopify to power our online store--you
        can read more about how Shopify uses your Personal Information here:
        https://www.shopify.com/legal/privacy. We also use Google Analytics to help us understand
        how our customers use the Site--you can read more about how Google uses your Personal
        Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of
        Google Analytics here: https://tools.google.com/dlpage/gaoptout.
        <br />
        <br />
        Finally, we may also share your Personal Information to comply with applicable laws and
        regulations, to respond to a subpoena, search warrant or other lawful request for
        information we receive, or to otherwise protect our rights.
      </FONTS.P>

      <FONTS.H2>DO NOT TRACK</FONTS.H2>
      <FONTS.P>
        Please note that we do not alter our Site’s data collection and use practices when we see a
        Do Not Track signal from your browser.
      </FONTS.P>

      <FONTS.H2>YOUR RIGHTS</FONTS.H2>
      <FONTS.P>
        If you are a European resident, you have the right to access personal information we hold
        about you and to ask that your personal information be corrected, updated, or deleted. If
        you would like to exercise this right, please contact us through the contact information
        below.
        <br />
        <br />
        Additionally, if you are a European resident we note that we are processing your information
        in order to fulfill contracts we might have with you (for example if you make an order
        through the Site), or otherwise to pursue our legitimate business interests listed above.
        Additionally, please note that your information will be transferred outside of Europe,
        including to Canada and the United States.
      </FONTS.P>

      <FONTS.H2>DATA RETENTION</FONTS.H2>
      <FONTS.P>
        When you place an order through the Site, we will maintain your Order Information for our
        records unless and until you ask us to delete this information.
      </FONTS.P>

      <FONTS.H2>CHANGES</FONTS.H2>
      <FONTS.P>
        We may update this privacy policy from time to time in order to reflect, for example,
        changes to our practices or for other operational, legal or regulatory reasons.
      </FONTS.P>

      <FONTS.H2>CONTACT US</FONTS.H2>
      <FONTS.P>
        For more information about our privacy practices, if you have questions, or if you would
        like to make a complaint, please contact us by e-mail at contact.meetsta@gmail.com.
      </FONTS.P>
    </Content>
  );
};

export default PrivacyPolicy;
