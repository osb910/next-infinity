'use client';
import {useId, useState, type ChangeEvent} from 'react';
import clsx from 'clsx';
import {LayoutGroup, motion} from 'framer-motion';

import {range} from '@/utils/numbers';
import Card from '@/ui/Card';

import Equation from './Equation';
import cls from './DivisionGroupsDemo.module.css';
import Slider from '@/ui/Slider';

export interface DivisionGroupsDemoProps {
  numOfItems?: number;
  initialNumOfGroups?: number;
  includeRemainderArea?: boolean;
}
const DivisionGroupsDemo = ({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}: DivisionGroupsDemoProps) => {
  const [numOfGroups, setNumOfGroups] = useState(initialNumOfGroups);
  const id = useId();

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : null;

  const items = range(numOfGroups).map(groupIdx =>
    range(numOfItemsPerGroup).map(
      idx => `item-${groupIdx * numOfItemsPerGroup + idx + 1}${id}`
    )
  );
  const remainderItems = range(remainder ?? 0).map(
    idx => `item-${numOfGroups * numOfItemsPerGroup + idx + 1}${id}`
  );

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        };

  return (
    <Card as='section' className={cls.wrapper}>
      <header className={cls.header}>
        <Slider
          label='Number of Groups'
          className={cls.slider}
          max={4}
          value={numOfGroups}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setNumOfGroups(Number(ev.target.value))
          }
        />
      </header>

      <LayoutGroup>
        <div className={cls.demoWrapper}>
          <div className={clsx(cls.demoArea)} style={gridStructure}>
            {items.map((group, groupIdx) => (
              <div key={groupIdx + 1} className={cls.group}>
                {group.map((item, idx) => (
                  <motion.div
                    layoutId={item}
                    key={item}
                    transition={{
                      type: 'spring',
                      damping: 30 + idx * 5,
                      stiffness: 250 + idx * 10,
                    }}
                    className={cls.item}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {includeRemainderArea && (
          <div className={cls.remainderArea}>
            <p className={cls.remainderHeading}>Remainder Area</p>

            {remainderItems.map((item, idx) => {
              return (
                <motion.div
                  key={item}
                  className={cls.item}
                  layoutId={item}
                  transition={{
                    type: 'spring',
                    damping: 30 + idx * 5,
                    stiffness: 250 + idx * 10,
                  }}
                />
              );
            })}
          </div>
        )}
      </LayoutGroup>

      <Equation
        dividend={numOfItems}
        divisor={numOfGroups}
        remainder={remainder}
      />
    </Card>
  );
};

export default DivisionGroupsDemo;
