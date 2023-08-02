import * as Tabs from '@radix-ui/react-tabs';
import styles from './Tabbed.module.css';
interface TabsProps {
  title: string;
  tabs: {label: string; value: string; component: JSX.Element}[];
  defaultTab: string;
}

const Tabbed = ({title, tabs, defaultTab}: TabsProps) => {
  return (
    <Tabs.Root className={styles.TabsRoot} defaultValue={defaultTab}>
      <Tabs.List className={styles.TabsList} aria-label={title}>
        {tabs.map(({label, value}) => (
          <Tabs.Trigger
            key={value}
            className={styles.TabsTrigger}
            value={value}
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map(({value, component}) => (
        <Tabs.Content key={value} className={styles.TabsContent} value={value}>
          {component}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default Tabbed;
