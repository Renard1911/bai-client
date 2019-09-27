import React from "react";
import { Segment, Header, List } from "semantic-ui-react";
import { Changelog } from "./Changelog";
import Moment from "react-moment";
import "moment/locale/es";

const ChangeLogPage = ({ nightMode }) => {
  return (
    <Segment inverted={nightMode}>
      <Header>Changelog</Header>
      <List inverted={nightMode}>
        {Changelog.map(date => {
          return (
            <List.Item key={date.timestamp}>
              <List.Header>
                <Moment unix date={date.timestamp} format="DD/MM/YY " />
                <small>
                  <Moment unix date={date.timestamp} fromNow />
                </small>
              </List.Header>
              <List.List>
                {date.list.map((change, i) => (
                  <List.Item key={i}>
                    <List.Icon name={change.icon}></List.Icon>
                    <List.Content>{change.desc}</List.Content>
                  </List.Item>
                ))}
              </List.List>
            </List.Item>
          );
        })}
      </List>
    </Segment>
  );
};

export default ChangeLogPage;
