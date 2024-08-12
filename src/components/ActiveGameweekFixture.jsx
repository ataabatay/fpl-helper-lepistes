import { useQuery } from 'react-query'
import { getAllData, getFDRsByWeek } from '../utils/Loaders'
import { useEffect } from 'react'

export default function ActiveGameweekFixture() {

  const {data: allData, isLoading: isLoadingAllData, error: allDataError} = useQuery('allData', getAllData)
  const {data: fixtureByWeek, isLoading: isLoadingFixtures, error: fixturesError} = useQuery('fdrsByWeek', getFDRsByWeek)

  useEffect(() => {
    console.log(allData)
    console.log(fixtureByWeek)
  })

  if (isLoadingAllData || isLoadingFixtures) return <div>Loading...</div>
  if (allDataError) return <div>Error loading data: {allDataError.message}</div>
  if (fixturesError) return <div>Error loading data: {fixturesError.message}</div>

  return (
    <>
      <h1>active game week fixture</h1>
    </>
  )
}