import React from 'react';
import { Table } from 'semantic-ui-react';
import Repo from './Repo'

const ReposList = (props) => {
  const {
    sortKey, sortDir, repos,
    handleSortByName, handleSortByWatchers,
    handleSortByLanguage, handleSortByUpdatedAt
  } = props;

   const setIcon = key => {
     if (key !== sortKey) {
       return null;
     } else {
       return sortDir === 'asc' ? 'sort ascending' : 'sort descending';
     }
   };

   return (
     <Table celled columns={5} fixed>
       <Table.Header>
         <Table.Row>
           <Table.HeaderCell
             width={3}
             content="name"
             icon={setIcon('name')}
             onClick={handleSortByName} />
           <Table.HeaderCell
             width={5}
             content="description"
           />
           <Table.HeaderCell
             width={2}
             content="watchers"
             icon={setIcon('watchers')}
             onClick={handleSortByWatchers}
           />
           <Table.HeaderCell
             width={3}
             content="language"
             icon={setIcon('language')}
             onClick={handleSortByLanguage}
           />
           <Table.HeaderCell
             width={3}
             content="updated at"
             icon={setIcon('updated_at')}
             onClick={handleSortByUpdatedAt}
           />
         </Table.Row>
       </Table.Header>
       <Table.Body>
         {repos.map((data, ind) => (<Repo key={ind} data={data} />))}
       </Table.Body>
     </Table>
   );
};
export default ReposList;
