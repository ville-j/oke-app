import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  Accordion,
  AccordionSection
} from "../components";

const Home = () => (
  <Accordion>
    <AccordionSection title="33. Zig Zag" />
    <AccordionSection title="34. Sink" />
    <AccordionSection title="35. Labyrinth Pro" visible>
      <Table>
        <TableRow head>
          <TableCell style={{ width: 50 }}>#</TableCell>
          <TableCell>Kuski</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>1.</TableCell>
          <TableCell>awsj [NORWICH]</TableCell>
          <TableCell>15,78</TableCell>
        </TableRow>
        <TableRow href="home">
          <TableCell>2.</TableCell>
          <TableCell>blaztek [EE]</TableCell>
          <TableCell>15,63</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3.</TableCell>
          <TableCell>blaztek [EE]</TableCell>
          <TableCell>15,63</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>4.</TableCell>
          <TableCell>blaztek [EE]</TableCell>
          <TableCell>15,63</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>5.</TableCell>
          <TableCell>blaztek [EE]</TableCell>
          <TableCell>15,63</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>6.</TableCell>
          <TableCell>blaztek [EE]</TableCell>
          <TableCell>15,63</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>7.</TableCell>
          <TableCell>blaztek [EE]</TableCell>
          <TableCell>15,63</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>8.</TableCell>
          <TableCell>blaztek [EE]</TableCell>
          <TableCell>15,63</TableCell>
        </TableRow>
      </Table>
    </AccordionSection>
    <AccordionSection title="36. Animal Fram" />
  </Accordion>
);

export default Home;
