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
                    serialPort1.DataReceived += serialPort1_DataReceived;
                    txtPortaNova.Text = "";
                    lblPortaAtual.Text = "Porta atual:" + serialPort1.PortName;
                }
                catch (System.UnauthorizedAccessException)
                {
                    serialPort1.PortName = ultimaPortaValida;
                    txtPortaNova.Text = "";
                    lblPortaAtual.Text = "Porta atual:" + serialPort1.PortName;
                }
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            String tagDeConexao = "Server=regulus.cotuca.unicamp.br;Database=PR118185;Uid=PR118185;Pwd=PR118185;";
            conexao = new SqlConnection(tagDeConexao);
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
            serialPort1.Close();
            codPulseira = linha.Substring(0, linha.IndexOf('L'));
            latitude = linha.Substring(linha.IndexOf('a') + 1, linha.LastIndexOf('L') - (linha.IndexOf('a')+1));
            longitude = linha.Substring(linha.IndexOf('o') + 1, (linha.Length - 2) - (linha.IndexOf('o')));
            SqlCommand setLatitude = new SqlCommand("Update Pulseira Set cordx =" + latitude + " where CodPulseira = " + codPulseira, conexao);
            setLatitude.ExecuteNonQuery();
            SqlCommand setLongitude = new SqlCommand("Update Pulseira Set cordy =" + longitude + "where CodPulseira = " + codPulseira, conexao);
            setLongitude.ExecuteNonQuery();
            serialPort1.Open();
        }

        private void btnIniciar_Click(object sender, EventArgs e)
        {
            serialPort1.Open();
        }

    }
}
