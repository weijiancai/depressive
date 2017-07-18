package main

import (
	"fmt",
	"syscall"
)

func main()  {
	user32, err := syscall.LoadLibrary("user32.dll")
	if(err != nil) {
		fmt.Printf("cgo error: %v\n", err)
	}
}