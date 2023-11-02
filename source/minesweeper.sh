#!/bin/sh

up="w"
down="s"
left="a"
right="d"
func1="q"
func2="e"
func3="x"

getch(){
  read -n 1
}

select(){
  result=2
  echo -e "\e[?25l"
  while true
  do
    clear
    echo -e "\e[0m$1"
    for ops in $(seq 2 $#)
    do
      eval option=\"\$$ops\"
      echo -n "  "
      if [ "$result" == "$ops" ]; then
        echo -en "\e[4m"
      fi
      echo -e "$option\e[0m"
    done
    echo -e "(Press $up & $down to select,\n $func1 or $func2 to choose,\n $func3 to exit)\e[8m"
    getch
    case "$REPLY" in
      "$up")
        if [ $result -gt 2 ]; then
          result=$(expr $result - 1)
        fi
        ;;
      "$down")
        if [ $result -lt $# ]; then
          result=$(expr $result + 1)
        fi
        ;;
      "$func1" | "$func2")
        break
        ;;
      "$func3")
        echo -e "\e[?25h\e[0m"
        exit
        ;;
    esac
  done
  clear
  echo -en "\e[?25h\e[0m"
  result=$(expr $result - 1)
}

arr(){
  if [ "$4" == "" ]; then
    eval result=\$array_$1_$2_$3
  else
    eval array_$1_$2_$3=\"$4\"
  fi
}

level(){
  select "Select Level:" "Easy" "Medium" "Hard" "Ex-Small"
  case "$result" in
    "1")
      num=10
      siz=9
      typ="Easy"
      ;;
    "2")
      num=18
      siz=12
      typ="Medium"
      ;;
    "3")
      num=28
      siz=15
      typ="Hard"
      ;;
    "4")
      num=1
      siz=3
      typ="Ex-Small"
      ;;
  esac
}

load(){
  echo "Selected: $typ($siz*$siz), $num mines"
  echo "Loading grid"
  for row in $(seq $siz)
  do
    for col in $(seq $siz)
    do
      arr "grid" $row $col 0
    done
  done
  echo "Setting mines"
  for cnt in $(seq $num)
  do
    while true
    do
      row=$(expr $RANDOM % $siz + 1)
      col=$(expr $RANDOM % $siz + 1)
      arr "grid" $row $col
      if [ $result == 0 ]; then
        break
      fi
    done
    arr "grid" $row $col -1
    for drow in -1 0 1
    do
      for dcol in -1 0 1
      do
        if [ $drow == 0 -a $dcol == 0 ]; then
          continue
        fi
        row2=$(expr $row + $drow)
        col2=$(expr $col + $dcol)
        if [ $row2 -lt 1 -o $row2 -gt $siz -o $col2 -lt 1 -o $col2 -gt $siz ]; then
          continue
        fi
        arr "grid" $row2 $col2
        if [ $result -ge 0 ]; then
          arr "grid" $row2 $col2 $(expr $result + 1)
        fi
      done
    done
  done
}

dfs(){
  row=$1
  col=$2
  for drow in -1 0 1
  do
    for dcol in -1 0 1
    do
      if [ $drow == 0 -a $dcol == 0 ]; then
        continue
      fi
      row2=$(expr $row + $drow)
      col2=$(expr $col + $dcol)
      if [ $row2 -lt 1 -o $row2 -gt $siz -o $col2 -lt 1 -o $col2 -gt $siz ]; then
        continue
      fi
      arr "show" $row2 $col2
      if [ $result == 0 ]; then
        arr "grid" $row2 $col2
        if [ $result -ge 0 ]; then
          arr "show" $row2 $col2 1
          if [ $result == 0 ]; then
            dfs $row2 $col2
          fi
        fi
      fi
    done
  done
}

main(){
  echo "Covering grid"
  crow=1
  ccol=1
  cnum=$num
  game_end=0
  for row in $(seq $siz)
  do
    for col in $(seq $siz)
    do
      arr "show" $row $col 0
    done
  done
  while true
  do
    clear
    echo -n "  "
    if [ $game_end == 0 ]; then
      echo -n ":)"
    elif [ $game_end == 1 ]; then
      echo -n "X("
    else
      echo -n "B)"
    fi
    echo "  $cnum"
    for row in $(seq $siz)
    do
      for col in $(seq $siz)
      do
        if [ $crow == $row -a $ccol == $col ]; then
          echo -en "\e[4m"
        fi
        arr "show" $row $col
        if [ $result == 0 ]; then
          echo -en "#"
        elif [ $result == 2 ]; then
          echo -en "&"
        else
          arr "grid" $row $col
          if [ $result == -1 ]; then
            echo -n "@"
          elif [ $result == 0 ]; then
            echo -n "."
          else
            echo -n "$result"
          fi
        fi
        echo -en "\e[0m "
      done
      echo
    done
    echo -e "$up$left$down$right to move, $func1 to dig, $func2 to mark, $func3 to exit\n"
    if [ $game_end != 0 ]; then
      break
    fi
    getch
    case "$REPLY" in
      "$up")
        if [ $crow -gt 1 ]; then
          crow=$(expr $crow - 1)
        fi
        ;;
      "$down")
        if [ $crow -lt $siz ]; then
          crow=$(expr $crow + 1)
        fi
        ;;
      "$left")
        if [ $ccol -gt 1 ]; then
          ccol=$(expr $ccol - 1)
        fi
        ;;
      "$right")
        if [ $ccol -lt $siz ]; then
          ccol=$(expr $ccol + 1)
        fi
        ;;
      "$func1")
        arr "grid" $crow $ccol
        if [ $result == -1 ]; then
          arr "show" $crow $ccol 1
          game_end=1
        else
          arr "show" $crow $ccol
          if [ $result != 1 ]; then
            arr "show" $crow $ccol 1
            dfs $crow $ccol
          fi
        fi
        ;;
      "$func2")
        arr "show" $crow $ccol
        if [ $result == 0 -a $cnum -gt 0 ]; then
          arr "show" $crow $ccol 2
          cnum=$(expr $cnum - 1)
        elif [ $result == 2 ]; then
          arr "show" $crow $ccol 0
          cnum=$(expr $cnum + 1)
        fi
        if [ $cnum == 0 ]; then
          game_end=2
          for row in $(seq $siz)
          do
            for col in $(seq $siz)
            do
              arr "grid" $row $col
              jud1=$result
              arr "show" $row $col
              jud2=$result
              if [ $jud1 == -1 -a $jud2 != 2 -o $jud2 == 2 -a $jud1 != -1 ]; then
                game_end=0
                break
              fi
            done
            if [ $game_end == 0 ]; then
              break
            fi
          done
        fi
        ;;
      "$func3")
        return 0
        ;;
    esac
  done
  sleep 3
}

level
load
while true
do
  main
  select "What to do?" "Try this board again" "Generate new grid" "Reselect level" "Exit game"
  case "$result" in
    "2")
      load
      ;;
    "3")
      level
      load
      ;;
    "4")
      break
      ;;
  esac
done
