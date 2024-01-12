import pandas as pd
from sklearn.cluster import KMeans
import json
import matplotlib.pyplot as plt
import numpy as np
import os

class ClusteringAnalyzer:
    def __init__(self, file_path):
        self.file_path = file_path
        self.data = None
        self.estilos_musicais = ['rock', 'samba', 'pop', 'rap']
        self.num_clusters = 8
        self.kmeans = KMeans(n_clusters=self.num_clusters, random_state=42, init='k-means++')

    def load_data(self):
        self.data = pd.read_csv(self.file_path)

    def apply_clustering(self):
        X = self.data.iloc[:, 1:]
        self.data['cluster'] = self.kmeans.fit_predict(X)

    def generate_radar_plots(self):
        for cluster_id in range(self.num_clusters):
            cluster_data = self.data[self.data['cluster'] == cluster_id]

            plt.figure(figsize=(10, 10))
            categories = self.estilos_musicais
            values = cluster_data[["horas_ouvidas_" + estilo for estilo in self.estilos_musicais]].mean().values
            num_categories = len(categories)

            angles = np.linspace(0, 2 * np.pi, num_categories, endpoint=False).tolist()
            values = np.concatenate((values, [values[0]]))
            angles += angles[:1]

            ax = plt.subplot(111, polar=True)
            ax.fill(angles, values, color='b', alpha=0.25)
            ax.set_yticklabels([])
            ax.set_xticks(angles[:-1])
            ax.set_xticklabels(categories)

            plt.title(f'Agrupamentos (K-Means) - Cluster {cluster_id + 1}')
            
            # Criando a pasta 'images' se não existir
            if not os.path.exists('images'):
                os.makedirs('images')
            
            # Salvando a imagem dentro da pasta 'images'
            plt.savefig(f'images/agrupamentos_kmeans_radar_cluster_{cluster_id + 1}.png')
            
            plt.close()

if __name__ == '__main__':
    user_directory = os.path.expanduser("~/uploads/data2.csv")
    analyzer = ClusteringAnalyzer(user_directory)
    analyzer.load_data()
    analyzer.apply_clustering()    
    analyzer.generate_radar_plots()
