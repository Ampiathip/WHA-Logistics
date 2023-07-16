import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem',}} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    // backgroundColor: 'rgba(0, 255, 255, 0.37)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState('');
  const [expandedDetail, setExpandedDetail] = useState('');
  const [expandedDetailPower, setExpandedDetailPower] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeDetail = (panel) => (event, newExpanded) => {
    setExpandedDetail(newExpanded ? panel : false);
  };

  const handleChangeDetailPower = (panel) => (event, newExpanded) => {
    setExpandedDetailPower(newExpanded ? panel : false);
  };

  return (
    <div className='MarginCard'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="body1">Devices_1</Typography>
        </AccordionSummary>
        {/* <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails> */}
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="body1">Devices_2</Typography>
        </AccordionSummary>
        {/* <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails> */}
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant="body1">Devices_3</Typography>
        </AccordionSummary>
        {/* <AccordionDetails> */}
        <Accordion expanded={expandedDetail === 'panel4'} onChange={handleChangeDetail('panel4')}>
        <AccordionSummary aria-controls="panel4-content" id="panel4-header" className="paddingLeftAccondion">
          <Typography variant="body1">Current</Typography>
        </AccordionSummary>
        </Accordion>

        <Accordion expanded={expandedDetail === 'panel5'} onChange={handleChangeDetail('panel5')}>
        <AccordionSummary aria-controls="panel5-content" id="panel5-header" className="paddingLeftAccondion">
          <Typography variant="body1">Voltage</Typography>
        </AccordionSummary>
        </Accordion>

        <Accordion expanded={expandedDetail === 'panel6'} onChange={handleChangeDetail('panel6')}>
        <AccordionSummary aria-controls="panel6-content" id="panel6-header" className="paddingLeftAccondion">
          <Typography variant="body1">Power</Typography>
        </AccordionSummary>
        <Accordion expanded={expandedDetailPower === 'PowerL1'} onChange={handleChangeDetailPower('PowerL1')}>
        <AccordionSummary aria-controls="PowerL1-content" id="PowerL1-header" className="paddingLeftPower">
          <Typography variant="body1" className='ColorAccondion'>Power L1</Typography>
        </AccordionSummary>
        </Accordion>

        <Accordion expanded={expandedDetailPower === 'PowerL2'} onChange={handleChangeDetailPower('PowerL2')}>
        <AccordionSummary aria-controls="PowerL2-content" id="PowerL1-header" className="paddingLeftPower">
          <Typography variant="body1" className='ColorAccondion'>Power L2</Typography>
        </AccordionSummary>
        </Accordion>

        <Accordion expanded={expandedDetailPower === 'PowerL3'} onChange={handleChangeDetailPower('PowerL3')}>
        <AccordionSummary aria-controls="PowerL3-content" id="PowerL1-header" className="paddingLeftPower">
          <Typography variant="body1" className='ColorAccondion'>Power L3</Typography>
        </AccordionSummary>
        </Accordion>

        </Accordion>
        {/* </AccordionDetails> */}
      </Accordion>
    </div>
  );
}