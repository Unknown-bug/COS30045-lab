import matplotlib.pyplot as plt
import numpy as np

# Sample pet ownership data
# These are sample values - replace with actual data if available
pet_types = ['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles', 'Small mammals']
ownership_2019 = [40, 27, 9, 11, 3, 4]  # percentages
ownership_2021 = [48, 33, 8, 12, 4, 5]  # percentages

# Calculate percentage change
pct_change = [(new - old) / old * 100 for old, new in zip(ownership_2019, ownership_2021)]

def create_comparison_chart():
    """Create bar chart comparing 2019 vs 2021 pet ownership"""
    plt.figure(figsize=(12, 8))
    x = np.arange(len(pet_types))
    width = 0.35
    
    plt.bar(x - width/2, ownership_2019, width, label='2019')
    plt.bar(x + width/2, ownership_2021, width, label='2021')
    
    plt.xlabel('Pet Types')
    plt.ylabel('Percentage of Households (%)')
    plt.title('Pet Ownership Comparison (2019 vs 2021)')
    plt.xticks(x, pet_types)
    plt.legend()
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    
    # Save as SVG
    plt.savefig('chart_comparison.svg', format='svg')
    plt.close()
    print("Created comparison chart: chart_comparison.svg")

def create_distribution_chart():
    """Create pie chart showing 2021 pet ownership distribution"""
    plt.figure(figsize=(10, 10))
    
    # Create pie chart with percentages
    plt.pie(ownership_2021, labels=pet_types, autopct='%1.1f%%', 
            startangle=90, shadow=True)
    plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle
    plt.title('Pet Ownership Distribution (2021)')
    
    # Save as SVG
    plt.savefig('chart_distribution.svg', format='svg')
    plt.close()
    print("Created distribution chart: chart_distribution.svg")

def create_change_chart():
    """Create bar chart showing percentage change from 2019-2021"""
    plt.figure(figsize=(12, 8))
    
    bars = plt.bar(pet_types, pct_change)
    
    # Color the bars based on positive or negative change
    for i, bar in enumerate(bars):
        if pct_change[i] >= 0:
            bar.set_color('green')
        else:
            bar.set_color('red')
    
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)
    plt.xlabel('Pet Types')
    plt.ylabel('Percentage Change (%)')
    plt.title('Change in Pet Ownership (2019-2021)')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    
    # Add value labels on top of bars
    for i, v in enumerate(pct_change):
        plt.text(i, v + (1 if v >= 0 else -3), f"{v:.1f}%", 
                ha='center', va='bottom' if v >= 0 else 'top')
    
    # Save as SVG
    plt.savefig('chart_change.svg', format='svg')
    plt.close()
    print("Created change chart: chart_change.svg")

def main():
    """Generate all charts"""
    print("Generating pet ownership charts...")
    create_comparison_chart()
    create_distribution_chart()
    create_change_chart()
    print("All charts generated successfully!")

if __name__ == "__main__":
    main() 