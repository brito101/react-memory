import * as C from "./App.styles"
import logoImg from "./assets/devmemory_logo.png"
import restartIcon from "./svgs/restart.svg"
import { Button } from "./components/Button"
import { InfoItem } from "./components/infoItem"
import { useEffect, useState } from "react"
import { GridItemType } from "./types/GridItemType"
import { items } from "./data/items"
import { GridItem } from "./components/GridItem"
import { formatTimeElapsed } from "./helpers/formatTimeElapsed"

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => resetGrig(), [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.show === true)

      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems]
          for (let i in tmpGrid) {
            if (tmpGrid[i].show) {
              tmpGrid[i].permanentShow = true
              tmpGrid[i].show = false
            }
          }
          setGridItems(tmpGrid)
          setShowCount(0)
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems]
            for (let i in tmpGrid) {
              tmpGrid[i].show = false
            }
            setGridItems(tmpGrid)
            setShowCount(0)
          }, 500)
        }

        setMoveCount((moveCount) => moveCount + 1)
      }
    }
  }, [showCount, gridItems])

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShow === true)
    ) {
      setPlaying(false)
    }
  }, [moveCount, gridItems])

  const resetGrig = () => {
    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)

    let tmpGrid: GridItemType[] = []
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        permanentShow: false,
        show: false,
      })
    }

    for (let w = 0; w < 2; w++) {
      for (let y = 0; y < items.length; y++) {
        let pos = -1
        while (pos < 0 || tmpGrid[pos].item != null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tmpGrid[pos].item = y
      }
    }

    setGridItems(tmpGrid)
    setPlaying(true)
  }

  const handleClick = (index: number) => {
    if (playing && index != null && showCount < 2) {
      let tmpGrid = [...gridItems]

      if (
        tmpGrid[index].permanentShow === false &&
        tmpGrid[index].show === false
      ) {
        tmpGrid[index].show = true
        setShowCount(showCount + 1)
      }

      setGridItems(tmpGrid)
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoInfo href=''>
          <img src={logoImg} width='200' alt=''></img>
        </C.LogoInfo>
        <C.InfoArea>
          <InfoItem
            label='Tempo'
            value={formatTimeElapsed(timeElapsed)}
          ></InfoItem>
          <InfoItem label='Movimentos' value={moveCount.toString()}></InfoItem>
        </C.InfoArea>
        <Button label='Reiniciar' icon={restartIcon} onClick={resetGrig} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App
