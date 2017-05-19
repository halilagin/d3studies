import code.book_plots as bp
import code.gh_internal as gh
import matplotlib.pyplot as plt
import numpy as np;
import time 
from pylab import *
from drawnow import drawnow, figure
from filterpy.discrete_bayes import normalize
from filterpy.discrete_bayes import predict
from filterpy.discrete_bayes import update
from scipy.ndimage import measurements
import filterpy.stats as stats

class Chapter04_02(object):
    

    def __init__(self):
        pass
    
    
    
    def draw_fig_prior(self):
        bp.bar_plot(self.prior,title="prior-"+str(self.loopIdx), ylim=(0,.4))
    
    def draw_fig_posterior(self):
        bp.bar_plot(self.posterior,title="posterior-"+str(self.loopIdx), ylim=(0,.4))
    
        
    def gauss(self):
        mu = 0
        variance = 5
        sigma = math.sqrt(variance)
        x = np.linspace(-10, 10, 100)
        plt.plot(x,mlab.normpdf(x, mu, sigma))
        plt.show()

        
    def run(self):
        #stats.plot_gaussian_pdf(mean=10, variance=1, mean_line=True, xlim=(4,16), ylim=(0,0.5), xlabel="nums", ylabel="ys", label="Gaussian PDF example")
        self.gauss()
        
        
        
        
def main():
    ch = Chapter04_02()
    ch.run()
    

if __name__ == "__main__": main()
