import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  const [data, setData] = useState({
    expense: 0,
    projects: 0,
    departments: 0,
    tasks: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('access_token'); // Adjust based on where you store your token
    
      try {
        const response = await Promise.all([
          fetch('http://localhost:8000/expenses/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch('http://localhost:8000/projects/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch('http://localhost:8000/departments/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch('http://localhost:8000/employees/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);
    
        const [expenseData, projectsData, departmentsData, employeesData] = await Promise.all(
          response.map((res) => res.json())
        );

        const totalExpense = expenseData.reduce((acc, expense) => acc + expense.amount, 0);
        const totalProjects = projectsData.length
        const totalDepartments = departmentsData.length
        const totalEmployees = employeesData.length
        setData({
          expense: Math.round(totalExpense), 
          projects: totalProjects, 
          departments: totalDepartments, 
          tasks: totalEmployees, 
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {data.projects ?? 0} {' '}
              <span className="fs-6 fw-normal">
                {/* Replace with actual percentage change logic */}
               
              </span>
            </>
          }
          title="Projects"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Projects over time',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [/* Add your project data here */],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: { display: false },
                    grid: { display: false, drawBorder: false },
                    ticks: { display: false },
                  },
                  y: {
                    min: 0,
                    display: false,
                    grid: { display: false },
                    ticks: { display: false },
                  },
                },
                elements: {
                  line: { borderWidth: 1, tension: 0.4 },
                  point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              ₹{data.expense ?? 0}{' '}
              <span className="fs-6 fw-normal">
                {/* Replace with actual percentage change logic */}
              </span>
            </>
          }
          title="Expenses"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Expenses over time',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [/* Add your expense data here */],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: { display: false },
                    grid: { display: false, drawBorder: false },
                    ticks: { display: false },
                  },
                  y: {
                    min: 0,
                    display: false,
                    grid: { display: false },
                    ticks: { display: false },
                  },
                },
                elements: {
                  line: { borderWidth: 1 },
                  point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              {data.departments ?? 0}{' '}
              <span className="fs-6 fw-normal">
                {/* Replace with actual percentage change logic */}
               
              </span>
            </>
          }
          title="Departments"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Departments over time',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [/* Add your department data here */],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
                maintainAspectRatio: false,
                scales: {
                  x: { display: false },
                  y: { display: false },
                },
                elements: {
                  line: { borderWidth: 2, tension: 0.4 },
                  point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              {data.tasks ?? 0}{' '}
              <span className="fs-6 fw-normal">
                {/* Replace with actual percentage change logic */}
            
              </span>
            </>
          }
          title="Employees"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ],
                datasets: [
                  {
                    label: 'Tasks over time',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [/* Add your task data here */],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    grid: { display: false, drawTicks: false },
                    ticks: { display: false },
                  },
                  y: {
                    border: { display: false },
                    grid: { display: false, drawBorder: false, drawTicks: false },
                    ticks: { display: false },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
