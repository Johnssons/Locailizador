using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Retransmissor
{
    public partial class Form1 : Form
    {
        SqlConnection conexao;
        string latitude, longitude, codPulseira;
        public Form1()
        {
            InitializeComponent();
        }

        private void btnTrocar_Click(object sender, EventArgs e)
        {
            string ultimaPortaValida = serialPort1.PortName;
            if(txtPortaNova.Text != null)
            {
                try
                {
                    serialPort1.PortName = txtPortaNova.Text;
                    serialPort1.Open();
                    serialPort1.Close();
                    txtPortaNova.Text = "";
                    lblPortaAtual.Text = "Porta atual:" + serialPort1.PortName;
                }
                catch (System.IO.IOException)
                {
                    serialPort1.PortName = ultimaPortaValida;
                    txtPortaNova.Text = "";
                    lblPortaAtual.Text = "Porta atual:" + serialPort1.PortName;
                }
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            String tagDeConexao = "Server=Regulus;Database=PR118185;Uid=PR118185;Pwd=PR118185;";
            SqlConnection conexao = new SqlConnection(tagDeConexao);
            conexao.Open();
            lblPortaAtual.Text = "Porta atual:" + serialPort1.PortName;
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            serialPort1.Close();
            conexao.Close();
        }

        private void serialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            string linha = serialPort1.ReadLine();
            codPulseira = linha.Substring(0, linha.IndexOf('L'));
            latitude = linha.Substring(linha.IndexOf('a') + 1, linha.LastIndexOf('L') - linha.IndexOf('a'));
            longitude = linha.Substring(linha.IndexOf('o') + 1);
        }

        private void btnIniciar_Click(object sender, EventArgs e)
        {
            serialPort1.Open();
            timer1.Start();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            SqlCommand setLatitude = new SqlCommand("Update Pulseira Set latitude =" + latitude + "where codigo = " + codPulseira, conexao);
            setLatitude.ExecuteNonQuery();
            SqlCommand setLongitude = new SqlCommand("Update Pulseira Set longitude =" + longitude + "where codigo = " + codPulseira, conexao);
            setLongitude.ExecuteNonQuery();
        }
    }
}
