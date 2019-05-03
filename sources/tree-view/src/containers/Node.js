import React, { useCallback, useMemo } from 'react'
import { Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {increment, createNode, addChild, removeChild, deleteNode} from '../actions'

export default function Node ({id, parentId}) {
  const nodeSelector = useCallback(state => {
    // const getSubtreeIds = rootId => [rootId, ...state[rootId].childIds.map(getSubtreeIds)];
    // return { ...state[id], subtreeIds: getSubtreeIds(id) };
    return state[id];
  }, [id]);
  const {counter, childIds} = useSelector(nodeSelector);

  const dispatch = useDispatch();
  const {
    handleIncrementClick,
    handleAddChildClick,
    handleRemoveClick,
  } =  useMemo(() => ({
    handleIncrementClick: () => {
      dispatch(increment(id));
    },
    handleAddChildClick: e => {
      e.preventDefault()
      const childId = dispatch(createNode()).nodeId
      dispatch(addChild(id, childId))
    },
    handleRemoveClick: e => {
      e.preventDefault()

      dispatch(removeChild(parentId, id))
      dispatch(deleteNode(id))
    }
  }), [dispatch, id, parentId])

  const renderChild = useCallback(childId => (
    <li key={childId}>
      <Node id={childId} parentId={id} />
    </li>
  ), [id])


  return (
    <div>
        Counter #{id}: {counter}
      {' '}
      <button className="increment" onClick={handleIncrementClick}>
        +
      </button>
      {' '}
      {typeof parentId !== 'undefined' &&
          <a href="#" className="deleteNode" onClick={handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
        style={{ color: 'lightgray', textDecoration: 'none' }}>
            Delete
          </a>
      }
          <ul>
            {childIds.map(renderChild)}
            <li key="add">
              <a href="#" className="addChild" // eslint-disable-line jsx-a11y/href-no-hash
    onClick={handleAddChildClick}
              >
                  Add child
              </a>
            </li>
          </ul>
        </div>
  )
}
