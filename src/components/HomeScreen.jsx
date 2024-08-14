import ActiveGameweekFixture from './ActiveGameweekFixture';
import LeagueTable from './LeagueTable';

export default function HomeScreen() {
  return (
    <>
      <section className="home-view flex max-w-screen-xl mx-auto py-10 gap-20">
        <ActiveGameweekFixture />
        <LeagueTable />
      </section>
    </>
  );
}
