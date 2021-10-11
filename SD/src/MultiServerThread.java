import java.net.*;
import java.io.*;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class MultiServerThread extends Thread {
   private Socket socket = null;

   public MultiServerThread(Socket socket) {
      super("MultiServerThread");
      this.socket = socket;
      ServerMultiClient.NoClients++;
      System.out.println("After Init");
   }

   public void run() {

      try {
         PrintWriter escritor = new PrintWriter(socket.getOutputStream(), true);
         BufferedReader entrada = new BufferedReader(new InputStreamReader(socket.getInputStream()));
         String lineIn, lineOut;

            while((lineIn = entrada.readLine()) != null){
                String timeStamp = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(Calendar.getInstance().getTime());
                System.out.println("Received: "+lineIn);
                escritor.flush();
                if(lineIn.equals("FIN")){
                   ServerMultiClient.NoClients--;
                                  break;
                }
                if(lineIn.equals("#cuantos#")){
                    escritor.println("El numero de clientes es: "+ServerMultiClient.numeroClientes);
                }
                else if(lineIn.equals("#FECHA#")){
                    escritor.println("La fecha exacta es: "+timeStamp.substring(0,10));
                }
                else if(lineIn.equals("#HORA#")){
                    escritor.println("La hora exacta es: "+timeStamp.substring(11));
                }
                else{
                   escritor.println("Echo... "+lineIn);
                   escritor.flush();
                }
            }
            try{
                entrada.close();
                escritor.close();
                socket.close();
            }catch(Exception e){
                System.out.println ("Error : " + e.toString());
                socket.close();
                System.exit (0);
            }
      }catch (IOException e) {
        System.out.println("Error---");
         e.printStackTrace();
      }
   }
}
