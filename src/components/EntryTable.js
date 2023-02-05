import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Sort from '@mui/icons-material/Sort';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EntryModal from './EntryModal';
import { getCategory } from '../utils/categories';
import { useState } from 'react';

// Table component that displays entries on home screen

export default function EntryTable({ entries, user }) {
   const [sortBy, setSortBy] = useState('name');
   const [ascending, setAscending] = useState(1);
   
   const handleChangeSort = (newSortBy) => {
      if (newSortBy === sortBy) {
         setAscending(ascending * -1);
         return;
      }
      setSortBy(newSortBy);
   }

   // Comparison function for entries.sort(); accounts for different datatypes that entryA/B could be
   // Return value < 0 if entryA should be before entryB, > 0 vice versa, == 0 if order doesn't change
   const comparison = (entryA, entryB) => {
      switch (sortBy){
         case 'name':
            let nameA = entryA.name.toLowerCase();
            let nameB = entryB.name.toLowerCase();

            if (nameA < nameB) {
               return -1 * ascending;
            }
            if (nameA > nameB) {
               return 1 * ascending;
            }
            return 0;

         case 'link':
            let linkA = entryA.link.toLowerCase();
            let linkB = entryB.link.toLowerCase();

            if (linkA < linkB) {
               return -1 * ascending;
            }
            if (linkA > linkB) {
               return 1 * ascending;
            }
            return 0;

         case 'category':
            let catA = getCategory(entryA.category).name.toLowerCase(); // categories are stored as an id
            let catB = getCategory(entryB.category).name.toLowerCase(); // getCategory allows us to acquire category object with name prop for sorting

            if (catA < catB) {
               return -1 * ascending;
            }
            if (catA > catB) {
               return 1 * ascending;
            }
            return 0;
            
         default:
            return;
      }
   }

   entries.sort(comparison);

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>
                     Name
                     <IconButton onClick={() => handleChangeSort('name')}>
                        <Sort/>
                     </IconButton>
                  </TableCell>
                  <TableCell align="right">
                     <IconButton onClick={() => handleChangeSort('link')}>
                        <Sort/>
                     </IconButton>
                     Link
                  </TableCell>
                  <TableCell align="right">
                     <IconButton onClick={() => handleChangeSort('user')}>
                        <Sort/>
                     </IconButton>
                     User
                  </TableCell>
                  <TableCell align="right">
                     <IconButton onClick={() => handleChangeSort('category')}>
                        <Sort/>
                     </IconButton>
                     Category
                  </TableCell>
                  <TableCell align="right">Open</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {entries.map((entry) => (
                  <TableRow
                     key={entry.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {entry.name}
                     </TableCell>
                     <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                     <TableCell align="right">{entry.user}</TableCell>
                     <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                     <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                        <EntryModal entry={entry} type="edit" user={user}/> {/* PASSED USER TO ENTRYMODAL SO THAT ENTRY MODAL CAN ACCESS IT */}
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
