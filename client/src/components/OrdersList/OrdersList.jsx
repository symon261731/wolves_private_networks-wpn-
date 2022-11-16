import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setOrderThunk } from '../../Redux/actions/orderActions';
import OneOrder from '../OneOrder/OneOrder';
import './OrderList.scss';
import usePagination from '../../hooks/usePagination';
import Pagination from '../Pagination/Pagination';
import AnimatedPage from '../AnimateRoute/AnimatedRoute';

export default function OrdersList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrderThunk());
  }, []);

  const order = useSelector((state) => state.order);

  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 5,
    count: order.length,
  });

  return (
    <AnimatedPage>
      <div className="order">
        <div className="order__container">
          <h1 className="order__title">ORDERS</h1>
          <Link to="/createorder" className="order__btn">Create order</Link>
        </div>
        <div>
          <div className="one-order">
            {order
              .slice(firstContentIndex, lastContentIndex)
              .map((el) => <OneOrder key={el.id} info={el} />)}
          </div>
          {order.length > 0
       && (
       <Pagination array={order} nextPage={nextPage} prevPage={prevPage} gaps={gaps} page={page} setPage={setPage} totalPages={totalPages} />
       )}
        </div>
      </div>
    </AnimatedPage>
  );
}
