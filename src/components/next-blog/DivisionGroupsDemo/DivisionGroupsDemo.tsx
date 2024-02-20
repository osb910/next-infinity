'use client';
import {useId, useState, type ChangeEvent} from 'react';
import clsx from 'clsx';
import {LayoutGroup, motion} from 'framer-motion';

import {range} from '@/utils/numbers';
import SliderControl from '@/components/next-blog/SliderControl';
import Card from '@/ui/Card';

import Equation from './Equation';
import cls from './DivisionGroupsDemo.module.css';

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
      idx => `item-${groupIdx * numOfItemsPerGroup + idx + 1}`
    )
  );
  const remainderItems = range(remainder ?? 0).map(
    r => `item-${numOfGroups * numOfItemsPerGroup + r + 1}`
  );
  console.log({items, remainderItems});

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
        <SliderControl
          label='Number of Groups'
          className={cls.slider}
          step={1}
          min={1}
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
            {range(numOfGroups).map(groupIdx => (
              <div key={groupIdx} className={cls.group}>
                {range(numOfItemsPerGroup).map(idx => (
                  <motion.div
                    layoutId={`${groupIdx + 1}:${idx + 1}`}
                    key={`item-${groupIdx + 1}:${idx + 1}`}
                    transition={{
                      type: 'spring',
                      damping: 25 + idx * 5,
                      stiffness: 200 + idx * 10,
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

            {range(remainder ?? 0).map(idx => {
              return (
                <motion.div
                  layoutId={`item-${idx}`}
                  key={idx}
                  className={cls.item}
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
