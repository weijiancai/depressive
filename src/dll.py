import ctypes

dll = ctypes.windll.LoadLibrary('user32.dll')
dll.MessageBoxA(0, "看我闪瞎你的狗年", 0, 0)