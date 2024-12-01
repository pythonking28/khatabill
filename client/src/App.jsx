import {createBrowserRouter, Route, RouterProvider, useNavigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import Graph from './components/Graph.jsx'
import About from './components/About.jsx'
import Home from './components/Home.jsx'
import AddBillBook from './components/bill/AddBillBook.jsx';
import AddBill from './components/bill/AddBill.jsx';
import AddTransaction from './components/bill/AddTransaction.jsx';
import TotalBills from './components/bill/TotalBills.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'summary',
        element: <SummaryCards />
      },
      {
        path: 'graph',
        element: <Graph />
      },
      {
        path: 'about',
        element: <About />
      },{
        path:'add-billbook',
        element: <AddBillBook />
      },{
        path:'add-bill',
        element: <AddBill />
      },{
        path: 'add-transaction',
        element: <AddTransaction />
      },{
        path: 'total-bills',
        element: <TotalBills />
      },{
        path: 'pending-bills',
        element: <TotalBills />
      }
    ]
  },
  
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <Toaster />
    </>
  )
}

export default App
