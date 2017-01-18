/* @flow */
import React, { Component } from 'react';
import List from 'grommet/components/List';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
// $FlowFixMe
import { PageHeader, PostListItem } from 'grommet-cms/components';

type Props = {
  sections?: Array<{ name: string, id: string }>,
  onMenuItemClick: Function,
  onAddSection: Function,
  onSelectSection: Function
}

export default class PostList extends Component {
  props: Props;
  render() {
    const {
      sections,
      onMenuItemClick,
      onAddSection,
      onSelectSection
    } = this.props;
    return (
      <Box>
        <PageHeader
          title="Edit Page" 
          controls={
            <Button onClick={onAddSection} plain label="Add Section" />
          } 
        />
        <List selectable onSelect={onSelectSection}>
          {sections ?
            sections.map((item, i) => 
              <PostListItem 
                key={i}
                totalItems={sections.length}
                onMenuItemClick={(name) => onMenuItemClick(name, i)}
                item={item}
              />
            )
          : 
            (
              <Box>
                <Heading tag="h2">No Sections yet</Heading>
              </Box>
            )
          }
        </List>
      </Box>
    );
  }
}

