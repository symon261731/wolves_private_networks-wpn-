import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentOfUserThunk } from '../../Redux/actions/commentsActions';

export default function Modal({ id }) {
  const [input, setInput] = useState('');
  const changeHandler = (e) => setInput(e.target.value);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  return (
    <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: '99999' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Add comment</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">

            <form
              className="form-vpn__form"
              onSubmit={(e) => {
                e.preventDefault();
                // eslint-disable-next-line max-len
                dispatch(addCommentOfUserThunk(input, setInput, id));
              }}
            >
              <div className="form-vpn__main-flex">
                <div className="form-vpn__inputs-flex">
                  <input
                    className="form-vpn__input"
                    name="content"
                    value={input}
                    onChange={changeHandler}
                    placeholder="write comment..."
                    type="text"
                  />
                </div>
                {/* <button className="form-vpn__btn" type="submit">confirm</button> */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Send</button>
                </div>
              </div>
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
