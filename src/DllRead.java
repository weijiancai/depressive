public class DllRead {
    static {
        System.loadLibrary("user32");
    }

    public static native int MessageBoxA(int hWnd,String lpText,int lpCaption,int uType);

    public static void main(String[] args) {
        System.out.println("start");
        MessageBoxA(0, "看我闪瞎你的狗年", 0, 0);
    }
}