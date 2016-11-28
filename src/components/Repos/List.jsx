import React from 'react';
import { Table } from 'semantic-ui-react';
import Repo from './Repo'

const ReposList = (props) => {
  const {
    sortKey, sortDir, repos,
    handleSortByName, handleSortByLanguage, handleSortByUpdatedAt
  } = props;

   const setIcon = key => {
     if (key !== sortKey) {
       return null;
     } else {
       return sortDir === 'asc' ? 'sort ascending' : 'sort descending';
     }
   };

   return (
     <Table celled structured>
       <Table.Header>
         <Table.Row>
           <Table.HeaderCell
             content="name"
             icon={setIcon('name')}
             onClick={handleSortByName} />
           <Table.HeaderCell content="description" />
           <Table.HeaderCell content="watchers" />
           <Table.HeaderCell
             content="language"
             icon={setIcon('language')}
             onClick={handleSortByLanguage}
           />
           <Table.HeaderCell
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
