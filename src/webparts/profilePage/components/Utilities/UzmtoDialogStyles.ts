import { IDialogStyles } from '@fluentui/react/lib/Dialog';

const dialogStyles: IDialogStyles = {
  root: {},
  main: [
    {
      selectors: {
        ['@media (min-width: 480px)']: {
          maxWidth: '700px',
          minWidth: '700px'
        }
      }
    }
  ]
};
export default dialogStyles;
