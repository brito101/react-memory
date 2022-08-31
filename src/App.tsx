import * as C from "./App.styles"
import logoImg from "./assets/devmemory_logo.png"
import restartIcon from "./svgs/restart.svg"
import { Button } from "./components/Button"
import { InfoItem } from "./components/infoItem"
import { useEffect, useState } from "react"
import { GridItemType } from "./types/GridItemType"

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItem, setGridItem] = useState<GridItemType[]>([])

  useEffect(() => resetGrig(), [])

  const resetGrig = () => {}

  return (
    <C.Container>
      <C.Info>
        <C.LogoInfo href=''>
          <img src={logoImg} width='200' alt=''></img>
        </C.LogoInfo>
        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'></InfoItem>
          <InfoItem label='Movimentos' value='0'></InfoItem>
        </C.InfoArea>
        <Button label='Reiniciar' icon={restartIcon} onClick={resetGrig} />
      </C.Info>
      <C.GridArea>
        <C.Grid></C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App
