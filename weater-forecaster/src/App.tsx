import Search from './components/Search'
import useForecast from './hooks/useForecast'

const App = (): JSX.Element => {
  const { place, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      {forecast != null ? (
        <p>We have a forecast!</p>
      ) : (
        <Search
          term={place}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        ></Search>
      )}
    </main>
  )
}

export default App
