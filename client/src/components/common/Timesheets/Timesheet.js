import PropTypes from 'prop-types';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Import logo as dataURL
import logo from './logo';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Timesheet = ({ payPeriod, user }) => {
  const { punches } = payPeriod;
  const punchRows = [];

  let wageHours = 0;
  let workStudyHours = 0;
  let nightOwlHours = 0;
  let totalHours = 0;

  punches.forEach(punch => {
    const punchWageHours = moment
      .duration(punch.clockOutMsTime - punch.clockInMsTime)
      .asHours();
    const punchWorkStudyHours = 0;
    const punchNightOwlHours = 0;
    const punchTotalHours = moment
      .duration(punch.clockOutMsTime - punch.clockInMsTime)
      .asHours();

    wageHours += punchWageHours;
    workStudyHours += punchWorkStudyHours;
    nightOwlHours += punchNightOwlHours;
    totalHours += punchTotalHours;

    const punchRow = [
      // Date
      moment(punch.clockInMsTime, 'x').format('YYYY-MM-DD'),
      // Time range
      `${moment(punch.clockInMsTime, 'x').format('h:mm a')} - ${moment(
        punch.clockOutMsTime,
        'x'
      ).format('h:mm a')}`,
      // Wages
      punchWageHours.toFixed(2),
      // Work study
      '--',
      // Night owl
      '--',
      // Total
      punchTotalHours.toFixed(2),
    ];

    punchRows.push(punchRow);
  });

  console.log(punchRows);

  const wagePay = wageHours * 7.25;
  const workStudyPay = workStudyHours * 7.25;
  const nightOwlPay = nightOwlHours * 8.25;
  const totalPay = wagePay + workStudyPay + nightOwlPay;

  const docDefinition = {
    content: [
      { image: 'logo', width: 200 },
      {
        text: 'Student Assistant Time Sheet',
        alignment: 'right',
        bold: true,
        margin: [0, 5],
      },
      {
        fontSize: 10,
        margin: [0, 10],
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            stack: [
              { text: 'Student Name', bold: true, margin: [0, 5] },
              `${user.firstName} ${user.lastName}`,
            ],
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: 'auto',
            stack: [
              { text: '9-Digit ID', bold: true, margin: [0, 5] },
              user.idNumber,
            ],
          },
          {
            // fixed width
            width: 'auto',
            stack: [{ text: 'NetID', bold: true, margin: [0, 5] }, user.netId],
          },
          {
            // % width
            width: '*',
            stack: [{ text: 'Department', bold: true, margin: [0, 5] }, ''],
          },
          {
            // % width
            width: 'auto',
            stack: [
              { text: 'Time Period', bold: true, margin: [0, 5] },
              `${payPeriod.startDate} - ${payPeriod.endDate}`,
            ],
          },
          {
            // % width
            width: 'auto',
            stack: [
              { text: 'Pay Period', bold: true, margin: [0, 5] },
              payPeriod.payPeriodId,
            ],
          },
        ],
        // optional space between columns
        columnGap: 15,
      },

      {
        layout: 'lightHorizontalLines', // optional
        style: { fontSize: 10 },
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          // widths: [50, 50, 50, 50, 50, '*'],
          widths: ['auto', 'auto', '*', '*', '*', 50],

          body: [
            ['Date', 'Time', 'Wages', 'Work Study', 'Night Owl', 'Total'],
            ...punchRows,
            [
              { text: 'Rate', colSpan: 2 },
              {},
              '$7.25/hr',
              '$7.25/hr',
              '$8.25/hr',
              '',
            ],
            [
              { text: 'Pay', colSpan: 2 },
              {},
              `$${wagePay.toFixed(2)}`,
              `$${workStudyPay.toFixed(2)}`,
              { text: `$${nightOwlPay.toFixed(2)}`, colSpan: 2 },
              {},
            ],
            [
              { text: 'Hours', colSpan: 2 },
              {},
              `${wageHours.toFixed(2)}`,
              `${workStudyHours.toFixed(2)}`,
              { text: `${nightOwlHours.toFixed(2)}`, colSpan: 2 },
              {},
            ],
            [
              {
                text: 'Total Hours:',
                colSpan: 5,
                fillColor: '#000',
                color: '#fff',
                margin: [0, 5],
                alignment: 'right',
                fontSize: 10,
              },
              {},
              {},
              {},
              {},
              {
                text: totalHours.toFixed(2),
                fillColor: '#000',
                color: '#fff',
                margin: [0, 5],
                fontSize: 10,
                alignment: 'left',
              },
            ],
            [
              {
                text: 'Total Pay:',
                colSpan: 5,
                fillColor: '#000',
                color: '#fff',
                margin: [0, 5],
                alignment: 'right',
                fontSize: 10,
              },
              {},
              {},
              {},
              {},
              {
                text: `$${totalPay.toFixed(2)}`,
                fillColor: '#000',
                color: '#fff',
                margin: [0, 5],
                fontSize: 10,
                alignment: 'left',
              },
            ],
          ],
        },
      },
    ],

    images: {
      logo,
    },
  };

  // Open Timesheet PDF in new tab
  pdfMake.createPdf(docDefinition).open();

  return null;
};

Timesheet.propTypes = {
  user: PropTypes.shape().isRequired,
  payPeriod: PropTypes.shape().isRequired,
};

export default Timesheet;
