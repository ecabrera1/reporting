import { Grid } from '@material-ui/core';

import ChartWrapper from './components/charts/ChartWrapper';
import AppHeader from './components/core/AppHeader';
import AppCard from './components/core/AppCard';

const App = () =>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <AppHeader />
    </Grid>
    <Grid item>
      <AppCard>
        <ChartWrapper />
      </AppCard>
    </Grid>
  </Grid>

export default App;
