import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Contacts } from '../../api/contact/Contacts';
import ContactAdmin from '../components/ContactAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListContactsAdmin extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Contacts (Admin)</Header>
        <Card.Group>
          {this.props.contacts.map((contact, index) => <ContactAdmin key={index} contact={contact}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListContactsAdmin.propTypes = {
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Contacts.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const contacts = Contacts.collection.find({}).fetch();
  return {
    contacts,
    ready,
  };
})(ListContactsAdmin);
